/* eslint-disable no-underscore-dangle */
import fs from 'fs';

import { logger } from '../../../utils';
import { ClientDTO } from '../../dto';
import { IClient } from '../../dto/dto.types';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { ISeeder } from '../seeders.types';

// eslint-disable-next-line import/prefer-default-export
export async function clientSeed({ reader, path: filePath, validator, report }: ISeeder<IClient>) {
  const unitOfWork = await uow();
  try {
    const { rows } = await reader(fs.createReadStream(filePath), {
      map: ClientDTO.schema,
    });

    if (rows.length) {
      const clients = rows.map(ClientDTO.mapper);
      await Promise.all(clients.flatMap(validator));
      const repo = unitOfWork.makeClientRepository();
      const result = await repo.add(clients);

      logger.info(`CLIENT_SEED SUCCESS Created ${result.length} of ${rows.length}`);
    }
  } catch (error) {
    logger.error(error);
    report.write(
      `[${new Date().toISOString()}] ERROR (CLIENT_SEED): ${
        error?.message
      }  Input: ${JSON.stringify(error?._original)}\n`
    );
    report.end();
  }
}
