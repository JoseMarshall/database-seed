import joi from 'joi';

import { Plan, PlanCategories, PlanTypes } from '../../../constants';
import { IPlan } from '../../../main/dto/dto.types';
import joiValidator from '../../index';
import { moneySchema } from '../sub-schemas';

const schema = joi
  .object({
    [Plan.Name]: joi.string().required(),
    [Plan.Categories]: joi
      .array()
      .items(
        joi
          .object({
            [PlanCategories.Cost]: joi.object(moneySchema),
            [PlanCategories.Category]: joi.string().required(),
          })
          .unknown(false)
          .required()
      )
      .min(1)
      .required(),
    [Plan.PlanType]: joi.valid(...Object.values(PlanTypes)).required(),
  })
  .required()
  .unknown(false);

export default joiValidator<IPlan>(schema);
