import BigMoneyFactory, { Round } from 'bigint-money';

import { Currencies, Money, Plafond } from '../constants';
import { IPlan } from '../dto/dto.types';
import { PlafondDocument } from '../main/external/repositories/mongodb/models/model.types';

interface CalcTotalPlafond {
  plafond: PlafondDocument[];
  totalPlafond: BigMoneyFactory;
}

// eslint-disable-next-line import/prefer-default-export
export const calcTotalPlafond = (plans: IPlan[]) => {
  if (!plans[0])
    return {
      totalPlafond: new BigMoneyFactory('0', Currencies.AOA, Round.HALF_TO_EVEN),
      plafond: [],
    } as CalcTotalPlafond;

  return plans.reduce(
    (acc: any, plan) => ({
      totalPlafond: acc.totalPlafond.add(
        new BigMoneyFactory(plan.cost.value.toString(), plan.cost.currency, plan.cost.round)
      ),
      plafond: acc.plafond.concat(
        plan.categories.flatMap(planCategory => [
          {
            [Plafond.CurrentValue]: {
              [Money.Value]: planCategory.cost.value.toString(),
              [Money.Currency]: planCategory.cost.currency,
              [Money.Round]: planCategory.cost.round ?? 1,
            },
            [Plafond.CaptiveValue]: {
              [Money.Value]: planCategory.cost.value.toString(),
              [Money.Currency]: planCategory.cost.currency,
              [Money.Round]: planCategory.cost.round ?? 1,
            },
            [Plafond.Service]: planCategory.category,
          },
        ])
      ),
    }),
    {
      totalPlafond: new BigMoneyFactory('0', plans[0].cost.currency, Round.HALF_TO_EVEN),
      plafond: [],
    }
  ) as CalcTotalPlafond;
};
