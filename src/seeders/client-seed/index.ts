import fs from 'fs';

import { ClientDTO } from '../../dto';
import { IClient } from '../../dto/dto.types';
import uow from '../../main/external/repositories/mongodb/unit-of-work';
import { logger } from '../../utils';
import { ISeeder } from '../seeders.types';

// eslint-disable-next-line import/prefer-default-export
export async function clientSeed({ reader, path }: ISeeder<IClient>) {
  const unitOfWork = await uow();
  try {
    const { rows } = await reader(fs.createReadStream(path), {
      map: ClientDTO.schema,
    });

    if (rows.length) {
      const clients = rows.map(ClientDTO.mapper);
      const repo = unitOfWork.makeClientRepository();
      const result = await repo.add(clients);

      logger.info(`CLIENT_SEED SUCCESS Created ${result.length} of ${rows.length}`);
    }
  } catch (error) {
    logger.error(error);
  }
}
