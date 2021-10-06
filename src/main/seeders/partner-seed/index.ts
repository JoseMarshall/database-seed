/* eslint-disable no-underscore-dangle */
import * as bcrypt from 'bcrypt';
import fs from 'fs';

import { Partner, User } from '../../../constants';
import { logger } from '../../../utils';
import { PartnerDTO } from '../../dto';
import { IPartner, IUser } from '../../dto/dto.types';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { IRepository } from '../../external/repositories/repository.types';
import { ISeeder } from '../seeders.types';

interface CreatePartnerDependencies {
  partnerRepo: IRepository<IPartner>;
  userRepo: IRepository<IUser>;
}

function makeCreatePartner({ partnerRepo, userRepo }: CreatePartnerDependencies) {
  return async (body: IPartner) => {
    // Create an user account
    const userAccount = await userRepo.add([
      {
        ...(body.userAccount as IUser),
        [User.Password]: await bcrypt.hash((body.userAccount as IUser).password.toString(), 10),
      },
    ]);

    // Save the partner in db
    const newPartner = await partnerRepo.add([
      {
        ...body,
        [Partner.UserAccount]: userAccount[0].id,
      },
    ]);
    return newPartner;
  };
}

// eslint-disable-next-line import/prefer-default-export
export async function partnerSeed({ reader, path, validator, report }: ISeeder<IPartner>) {
  const unitOfWork = await uow();
  try {
    const { rows } = await reader(fs.createReadStream(path), {
      map: PartnerDTO.schema,
    });

    if (rows.length) {
      const partners = rows.map(PartnerDTO.mapper);
      await Promise.all(partners.flatMap(validator));
      const partnerRepo = unitOfWork.makePartnerRepository();
      const userRepo = unitOfWork.makeUserRepository();

      const result = await Promise.all(
        partners.flatMap(makeCreatePartner({ partnerRepo, userRepo }))
      );
      logger.info(`PARTNER_SEED SUCCESS ${result.length} of ${rows.length}`);
    }
  } catch (error) {
    logger.error(error);
    report.write(
      `[${new Date().toISOString()}] ERROR (PARTNER_SEED): ${
        error?.message
      }  Input: ${JSON.stringify(error?._original)}\n`
    );
    report.end();
  }
}
