import fs from 'fs';
import { Types as MongooseTypes } from 'mongoose';

import { Client, Common, ContactInformation, Member, Money, Plan } from '../../constants';
import { MemberDTO } from '../../dto';
import { IClient, IMember, IPlan } from '../../dto/dto.types';
import { mongoObjectIdGenerator } from '../../main/external/repositories/mongodb/helpers/object-id-generator';
import uow from '../../main/external/repositories/mongodb/unit-of-work';
import { IRepository } from '../../main/external/repositories/repository.types';
import { logger } from '../../utils';
import { calcTotalPlafond } from '../helpers';
import { ISeeder } from '../seeders.types';

interface CreateMemberDependencies {
  planRepo: IRepository<IPlan>;
  clientRepo: IRepository<IClient>;
  memberRepo: IRepository<IMember>;
}

function makeCreateMember({ planRepo, clientRepo, memberRepo }: CreateMemberDependencies) {
  return async (body: IMember) => {
    let fetchedPlan;
    const memberId = mongoObjectIdGenerator();

    if (body.plan) {
      fetchedPlan = await planRepo.findOne({ [Plan.Name]: new RegExp(body.plan, 'i') });

      // Increments the totalMembers count in Plan Collection
      await planRepo.update(
        { [Common.MongoId]: MongooseTypes.ObjectId(fetchedPlan.id) },
        {
          $inc: { [Plan.TotalMembers]: 1 },
          $push: { [Plan.Members]: memberId },
        }
      );
    }
    // Fetch the selected plan

    const { plafond, totalPlafond } = calcTotalPlafond([fetchedPlan]);

    // Increments the totalMembers count in Client Collection
    const client = await clientRepo.update(
      {
        [`${Client.ContactInformation}.${ContactInformation.Email}`]: new RegExp(body.client, 'i'),
      },
      {
        $inc: {
          [Client.TotalMembers]: 1,
          [`${Client.Plafond}.${Money.Value}`]: Number(totalPlafond.toJSON()[0]),
        },
        $push: { [Client.Members]: memberId },
      }
    );

    // Save the member in Database
    const newMember = await memberRepo.add([
      {
        ...body,
        [Common.MongoId]: memberId,
        [Member.TotalPlafond]: {
          [Money.Round]: 1,
          [Money.Value]: totalPlafond.toJSON()[0],
          [Money.Currency]: totalPlafond.currency,
        },
        [Member.Plafond]: plafond,
        [Member.Client]: client.id,
        ...(fetchedPlan ? { [Member.Plan]: fetchedPlan.id } : {}),
      },
    ]);

    return newMember;
  };
}

// eslint-disable-next-line import/prefer-default-export
export async function memberSeed({ reader, path }: ISeeder<IMember>) {
  const unitOfWork = await uow();
  try {
    const { rows } = await reader(fs.createReadStream(path), {
      map: MemberDTO.schema,
    });

    if (rows.length) {
      const members = rows.map(MemberDTO.mapper);

      const planRepo = unitOfWork.makePlanRepository();
      const memberRepo = unitOfWork.makeMemberRepository();
      const clientRepo = unitOfWork.makeClientRepository();

      const result = await Promise.all(
        members.flatMap(makeCreateMember({ clientRepo, planRepo, memberRepo }))
      );
      logger.info(`MEMBER_SEED SUCCESS ${result.length} of ${rows.length}`);
    }
  } catch (error) {
    logger.error(error);
  }
}
