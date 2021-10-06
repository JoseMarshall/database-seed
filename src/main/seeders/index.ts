import fs from 'fs';
import path from 'path';

import {
  ClientValidator,
  DependentValidator,
  MemberValidator,
  PartnerValidator,
  PlanCategoryValidator,
  PlanValidator,
} from '../../validations/schemas';
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
    validator: PlanCategoryValidator,
    report: fs.createWriteStream(path.resolve('src/report/plan-category-log.txt'), {
      encoding: 'utf-8',
      flags: 'a',
    }),
  });

  await planSeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/plans.xlsx'),
    validator: PlanValidator,
    report: fs.createWriteStream(path.resolve('src/report/plan-log.txt'), {
      encoding: 'utf-8',
      flags: 'a',
    }),
  });

  await clientSeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/clients.xlsx'),
    validator: ClientValidator,
    report: fs.createWriteStream(path.resolve('src/report/client-log.txt'), {
      encoding: 'utf-8',
      flags: 'a',
    }),
  });

  await memberSeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/members.xlsx'),
    validator: MemberValidator,
    report: fs.createWriteStream(path.resolve('src/report/member-log.txt'), {
      encoding: 'utf-8',
      flags: 'a',
    }),
  });

  await dependentSeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/dependents.xlsx'),
    validator: DependentValidator,
    report: fs.createWriteStream(path.resolve('src/report/dependent-log.txt'), {
      encoding: 'utf-8',
      flags: 'a',
    }),
  });

  await partnerSeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/partners.xlsx'),
    validator: PartnerValidator,
    report: fs.createWriteStream(path.resolve('src/report/partner-log.txt'), {
      encoding: 'utf-8',
      flags: 'a',
    }),
  });
};
