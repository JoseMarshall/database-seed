/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { Types as MongooseTypes } from 'mongoose';

import { Client, Common, ContactInformation, Member, Money, Plan } from '../../../constants';
import { logger } from '../../../utils';
import { MemberDTO } from '../../dto';
import { IClient, IMember, IPlan } from '../../dto/dto.types';
import { mongoObjectIdGenerator } from '../../external/repositories/mongodb/helpers/object-id-generator';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { IRepository } from '../../external/repositories/repository.types';
import { ISeeder } from '../seeders.types';
import { calcTotalPlafond } from './helpers';

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

      const fetchedClient = await clientRepo.findOne({
        [`${Client.ContactInformation}.${ContactInformation.Email}`]: new RegExp(body.client, 'i'),
      });

      // Increments the totalMembers count in Plan Collection
      await planRepo.update(
        { [Common.MongoId]: MongooseTypes.ObjectId(fetchedPlan.id) },
        {
          $inc: {
            [Plan.TotalMembers]: 1,
            ...(body.isClient ? { [Plan.TotalClients]: 1 } : {}),
          },
          $push: {
            [Plan.Members]: memberId,
            ...(body.isClient ? { [Plan.Clients]: fetchedClient.id } : {}),
          },
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
        ...(body.isClient
          ? { $set: { [Client.Plans]: [MongooseTypes.ObjectId(fetchedPlan.id)] } }
          : {}),
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
export async function memberSeed({ reader, path, report, validator }: ISeeder<IMember>) {
  const unitOfWork = await uow();
  try {
    const { rows } = await reader(fs.createReadStream(path), {
      map: MemberDTO.schema,
    });

    if (rows.length) {
      const members = rows.map(MemberDTO.mapper);
      await Promise.all(members.flatMap(validator));
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
    report.write(
      `[${new Date().toISOString()}] ERROR (MEMBER_SEED): ${
        error?.message
      }  Input: ${JSON.stringify(error?._original)}\n`
    );
    report.end();
  }
}
