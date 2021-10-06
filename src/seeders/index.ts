import path from 'path';

import { clientSeed } from './client-seed';
import { dependentSeed } from './dependent-seed';
import { memberSeed } from './member-seed';
import { partnerSeed } from './partner-seed';
import { planCategorySeed } from './plan-category-seed';
import { planSeed } from './plan-seed';

const readXlsxFile = require('read-excel-file/node');

export default async () => {
  await planCategorySeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/plan-categories.xlsx'),
  });

  await planSeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/plans.xlsx'),
  });

  await clientSeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/clients.xlsx'),
  });

  await memberSeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/members.xlsx'),
  });

  await dependentSeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/dependents.xlsx'),
  });

  await partnerSeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/partners.xlsx'),
  });
};
