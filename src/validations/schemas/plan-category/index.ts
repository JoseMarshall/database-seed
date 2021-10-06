import joi from 'joi';

import { Benefit, PlanCategory } from '../../../constants';
import { IPlanCategory } from '../../../main/dto/dto.types';
import joiValidator from '../../index';

export const schema = joi
  .object({
    [PlanCategory.Name]: joi.string().required(),
    [PlanCategory.Exclusions]: joi.array().items(joi.string()),
    [PlanCategory.Benefits]: joi
      .array()
      .items(
        joi
          .object({
            [Benefit.Name]: joi.string().required(),
            [Benefit.Coverages]: joi.array().items(joi.string()).min(1).required(),
          })
          .unknown(false)
          .required()
      )
      .min(1)
      .required(),
  })
  .required()
  .unknown(false);

export default joiValidator<IPlanCategory>(schema);
