import { Benefit, PlanCategory } from '../../constants';
import { IDataTransferObject } from './dto.types';

const planCategoryDTO: IDataTransferObject = {
  schema: {
    'Name*': PlanCategory.Name,
    'Exclusions*': PlanCategory.Exclusions,
    [PlanCategory.Benefits]: {
      [PlanCategory.Benefits]: {
        'Benefit Name*': Benefit.Name,
        'Benefit Coverages*': Benefit.Coverages,
      },
    },
  },
  reducer: (acc: any[], row: any) => {
    if (!row.name) {
      const lastPlanCategory = acc[acc.length - 1];
      return [
        ...acc.slice(0, acc.length - 1),
        {
          ...lastPlanCategory,
          [PlanCategory.Benefits]: [
            ...lastPlanCategory[PlanCategory.Benefits],
            {
              [Benefit.Name]: row[PlanCategory.Benefits][Benefit.Name],
              [Benefit.Coverages]: row[PlanCategory.Benefits][Benefit.Coverages]
                .split(';')
                .map((b: string) => b.trim()),
            },
          ],
        },
      ];
    }
    return acc.concat({
      [PlanCategory.Name]: row.name,
      [PlanCategory.Exclusions]: row.exclusions.split(';').map((e: string) => e.trim()),
      [PlanCategory.Benefits]: [
        {
          [Benefit.Name]: row[PlanCategory.Benefits][Benefit.Name],
          [Benefit.Coverages]: row[PlanCategory.Benefits][Benefit.Coverages]
            .split(';')
            .map((b: string) => b.trim()),
        },
      ],
    });
  },
};

export default planCategoryDTO;
