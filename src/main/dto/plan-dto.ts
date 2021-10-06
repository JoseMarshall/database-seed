import { Money, Plan, PlanCategories } from '../../constants';
import { IDataTransferObject } from './dto.types';

interface IMoney {
  [Money.Value]: number | string;
}
interface PlanCategory {
  [PlanCategories.Category]: string;
  [PlanCategories.Cost]: IMoney;
}

interface InputRow {
  [Plan.Name]: string;
  [Plan.PlanType]: string;
  [Plan.Categories]: PlanCategory;
}

interface OutputRow {
  [Plan.Name]: string;
  [Plan.PlanType]: string;
  [Plan.Categories]: PlanCategory[];
}

const planDTO: IDataTransferObject = {
  schema: {
    'Name*': Plan.Name,
    'Plan Type*': Plan.PlanType,
    [Plan.Categories]: {
      [Plan.Categories]: {
        'Category Name*': PlanCategories.Category,
        [PlanCategories.Cost]: {
          [PlanCategories.Cost]: {
            'Category Cost*': Money.Value,
          },
        },
      },
    },
  },
  reducer: (acc: OutputRow[], row: InputRow) => {
    if (!row.name) {
      const lastPlan = acc[acc.length - 1];
      return [
        ...acc.slice(0, acc.length - 1),
        {
          ...lastPlan,
          [Plan.Categories]: [
            ...lastPlan[Plan.Categories],
            {
              ...row[Plan.Categories],
              [PlanCategories.Cost]: { [Money.Value]: row.categories.cost.value.toString() },
            },
          ],
        },
      ];
    }
    return acc.concat({
      ...row,
      [Plan.Categories]: [
        {
          ...row[Plan.Categories],
          [PlanCategories.Cost]: { [Money.Value]: row.categories.cost.value.toString() },
        },
      ],
    });
  },
};

export default planDTO;
