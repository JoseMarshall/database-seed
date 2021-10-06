/* eslint-disable no-underscore-dangle */
import fs from 'fs';

import { Common, ContactInformation, Dependent, Member } from '../../../constants';
import { logger } from '../../../utils';
import { DependentDTO } from '../../dto';
import { IDependent, IMember } from '../../dto/dto.types';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { IRepository } from '../../external/repositories/repository.types';
import { ISeeder } from '../seeders.types';

interface CreateDependentDependencies {
  dependentRepo: IRepository<IDependent>;
  memberRepo: IRepository<IMember>;
}

function makeCreateDependent({ dependentRepo, memberRepo }: CreateDependentDependencies) {
  return async (body: IDependent) => {
    const member = await memberRepo.findOne({
      [`${Member.ContactInformation}.${ContactInformation.Email}`]: new RegExp(body.member, 'i'),
    });
    // Save the dependent in Database
    const newDependent = await dependentRepo.add([{ ...body, [Dependent.Member]: member.id }]);

    // Add dependent id to dependents array in Members Collection
    await memberRepo.update(
      { [Common.MongoId]: member[Common.MongoId] },
      {
        $push: { [Member.Dependents]: newDependent[0].id },
      }
    );

    return newDependent;
  };
}

// eslint-disable-next-line import/prefer-default-export
export async function dependentSeed({ reader, path, validator, report }: ISeeder<IDependent>) {
  const unitOfWork = await uow();
  try {
    const { rows } = await reader(fs.createReadStream(path), {
      map: DependentDTO.schema,
    });

    if (rows.length) {
      const memberRepo = unitOfWork.makeMemberRepository();
      const dependentRepo = unitOfWork.makeDependentRepository();
      await Promise.all(rows.flatMap(validator));
      const result = await Promise.all(
        rows.flatMap(makeCreateDependent({ dependentRepo, memberRepo }))
      );
      logger.info(`DEPENDENT_SEED SUCCESS ${result.length} of ${rows.length}`);
    }
  } catch (error) {
    logger.error(error);
    report.write(
      `[${new Date().toISOString()}] ERROR (DEPENDENT_SEED): ${
        error?.message
      }  Input: ${JSON.stringify(error?._original)}\n`
    );
    report.end();
  }
}
