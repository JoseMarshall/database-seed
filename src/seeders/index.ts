import path from 'path';

import { planCategorySeed } from './plan-category-seed';

const readXlsxFile = require('read-excel-file/node');

export default async () => {
  await planCategorySeed({
    reader: readXlsxFile,
    path: path.resolve('src/input-files/plan-category.xlsx'),
  });
};
