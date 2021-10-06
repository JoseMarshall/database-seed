import MoneyFactory, { Round } from 'bigint-money';
import fs from 'fs';

import { Currencies, Money, Plan, PlanCategories, PlanCategory } from '../../../constants';
import { PlanDTO } from '../../dto';
import { IPlan, IPlanCategory } from '../../dto/dto.types';
import { logger } from '../../../utils';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { IRepository } from '../../external/repositories/repository.types';
import { ISeeder } from '../seeders.types';

interface CreatePlanDependencies {
  planRepo: IRepository<IPlan>;
  planCategoryRepo: IRepository<IPlanCategory>;
}

export function makeCreatePlan({ planRepo, planCategoryRepo }: CreatePlanDependencies) {
  return async (body: IPlan) => {
    // Compute the total cost plan, from plan categories values
    const [totalValue, currency] = body.categories
      .reduce(
        (acc, curr) =>
          acc.add(new MoneyFactory(curr.cost.value, Currencies.AOA, Round.HALF_TO_EVEN)),
        new MoneyFactory(0, Currencies.AOA)
      )
      .toJSON();

    const fetchedCategories = await Promise.all(
      body.categories.flatMap(c => [
        (async ({ category, cost }) => {
          const planCategory = await planCategoryRepo.findOne({
            [PlanCategory.Name]: new RegExp(category, 'i'),
          });

          return {
            [PlanCategories.Cost]: {
              [Money.Value]: cost.value.toString(),
              [Money.Currency]: Currencies.AOA,
            },
            [PlanCategories.Category]: planCategory.id,
          };
        })(c),
      ])
    );
    body.categories = fetchedCategories;
    // Save the new plan
    const newPlan = await planRepo.add([
      {
        ...body,
        [Plan.Cost]: { [Money.Value]: totalValue, [Money.Currency]: currency },
      },
    ]);

    return newPlan;
  };
}

// eslint-disable-next-line import/prefer-default-export
export async function planSeed({ reader, path }: ISeeder<IPlan>) {
  const unitOfWork = await uow();
  try {
    const { rows } = await reader(fs.createReadStream(path), {
      map: PlanDTO.schema,
    });

    if (rows.length) {
      const plans = rows.reduce(PlanDTO.reducer, []);
      const planRepo = unitOfWork.makePlanRepository();
      const planCategoryRepo = unitOfWork.makePlanCategoryRepository();

      const result = await Promise.all(
        plans.flatMap(makeCreatePlan({ planRepo, planCategoryRepo }))
      );

      logger.info(`PLAN_SEED SUCCESS ${result.length}`);
    }
  } catch (error) {
    logger.error(error);
  }
}
