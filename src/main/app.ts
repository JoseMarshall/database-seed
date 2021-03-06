import { config } from 'dotenv';
import path from 'path';

import { logger } from '../utils/logger';
import { MongoHelper } from './external/repositories/mongodb/helpers/mongo-helper';
import startSeeding from './seeders';

const mongoInit = async () => {
  await MongoHelper.connect();
  // eslint-disable-next-line no-extra-boolean-cast
  if (process.env.DROP_DATABASE === 'true') {
    await MongoHelper.dropDatabase();
  }
};

const start = async () => {
  try {
    config({
      path: path.resolve(
        process.cwd(),
        `.env.${process.env.TS_NODE_DEV ? 'development' : 'production'}`
      ),
    });

    await mongoInit();
    await startSeeding();

    logger.info(
      {
        Completed:
          'Thanks for using database-seed, in case of fails check the reports for more details',
      },
      'Completed!!!'
    );
  } catch (error) {
    logger.error(error);
  }
};

start().then();

process.on('uncaughtException', err => {
  logger.error(`${new Date().toUTCString()} uncaughtException:`, err.message);
  logger.error(err.stack ?? '');
  process.exit(1);
});
