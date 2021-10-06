import joi from 'joi';

import { Dependent, KinshipDegrees } from '../../../constants';
import { IDependent } from '../../../main/dto/dto.types';
import joiValidator from '../../index';
import {
  bankAccountInformationSchema,
  contactInformationSchema,
  personalInformationSchema,
} from '../sub-schemas';

const schema = joi
  .object({
    [Dependent.PersonalInformation]: joi.object(personalInformationSchema).required(),
    [Dependent.ContactInformation]: joi.object(contactInformationSchema).required(),
    [Dependent.BankAccountInformation]: joi.object(bankAccountInformationSchema).required(),
    [Dependent.Member]: joi.string().email().required(),
    [Dependent.KinshipDegree]: joi
      .string()
      .valid(...Object.keys(KinshipDegrees))
      .required(),
  })
  .required()
  .unknown(false);

export default joiValidator<IDependent>(schema);
