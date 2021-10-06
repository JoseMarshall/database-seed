import fs from 'fs';

import { PlanCategoryDTO } from '../../dto';
import { IPlanCategory } from '../../dto/dto.types';
import uow from '../../main/external/repositories/mongodb/unit-of-work';
import { logger } from '../../utils';
import { ISeeder } from '../seeders.types';

// eslint-disable-next-line import/prefer-default-export
export async function planCategorySeed({ reader, path }: ISeeder<IPlanCategory>) {
  const unitOfWork = await uow();
  try {
    const { rows } = await reader(fs.createReadStream(path), {
      map: PlanCategoryDTO.schema,
    });

    if (rows.length) {
      const planCategories = rows.reduce(PlanCategoryDTO.reducer, []);
      const repo = unitOfWork.makePlanCategoryRepository();
      const result = await repo.add(planCategories);

      logger.info(`PLAN_CATEGORY_SEED SUCCESS ${result.length}`);
    }
  } catch (error) {
    logger.error(error);
  }
}
