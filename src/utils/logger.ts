import pino, { stdTimeFunctions } from 'pino';

// eslint-disable-next-line import/prefer-default-export
export const logger = pino({
  name: 'Find-All-In-API',
  prettyPrint: true,
  timestamp: stdTimeFunctions.isoTime,
});
