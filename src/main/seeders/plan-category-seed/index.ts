import fs from 'fs';

import { logger } from '../../../utils';
import { PlanCategoryDTO } from '../../dto';
import { IPlanCategory } from '../../dto/dto.types';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { ISeeder } from '../seeders.types';

// eslint-disable-next-line import/prefer-default-export
export async function planCategorySeed({
  reader,
  path: filePath,
  validator,
  report,
}: ISeeder<IPlanCategory>) {
  const unitOfWork = await uow();
  try {
    const { rows } = await reader(fs.createReadStream(filePath), {
      map: PlanCategoryDTO.schema,
    });

    if (rows.length) {
      const planCategories = rows.reduce(PlanCategoryDTO.reducer, []);

      await Promise.all(planCategories.flatMap(validator));
      const repo = unitOfWork.makePlanCategoryRepository();
      const result = await repo.add(planCategories);

      logger.info(`PLAN_CATEGORY_SEED SUCCESS ${result.length}`);
    }
  } catch (error) {
    logger.error(error);
    report.write(`[${new Date().toISOString()}] ERROR (PLAN_CATEGORY_SEED) ${error?.message}`);
    report.end();
  }
}
