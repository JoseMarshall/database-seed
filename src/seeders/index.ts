import path from 'path';

import { clientSeed } from './client-seed';

const readXlsxFile = require('read-excel-file/node');

export default async () => {
  await clientSeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/clients.xlsx'),
  });
};
