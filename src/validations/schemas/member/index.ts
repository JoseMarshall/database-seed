import joi from 'joi';

import {
  Genders,
  IdentificationDocument,
  Member,
  Nationalities,
  PersonalInformation,
} from '../../../constants';
import { IMember } from '../../../main/dto/dto.types';
import joiValidator from '../../index';
import { bankAccountInformationSchema, contactInformationSchema } from '../sub-schemas';

const schema = joi
  .object({
    [Member.PersonalInformation]: joi
      .object({
        [PersonalInformation.Name]: joi.string().required(),
        [PersonalInformation.DateOfBirth]: joi.date().required(),
        [PersonalInformation.Gender]: joi.valid(...Object.values(Genders)).required(),
        [PersonalInformation.Nationality]: joi
          .string()
          .valid(...Object.keys(Nationalities))
          .required(),
        [PersonalInformation.IdentificationDocument]: joi
          .object({
            [IdentificationDocument.Number]: joi.string().required(),
            [IdentificationDocument.Name]: joi.string().required(),
            [IdentificationDocument.DateOfExpiration]: joi.date().required(),
          })
          .required(),
      })
      .required(),
    [Member.ContactInformation]: joi.object(contactInformationSchema).required(),
    [Member.BankAccountInformation]: joi.object(bankAccountInformationSchema),
    [Member.Client]: joi.string().email().required(),
    [Member.Plan]: joi.string(),
    [Member.EmployeeNumber]: joi.alternatives().try(joi.string(), joi.number()),
  })
  .required()
  .unknown(true);

export default joiValidator<IMember>(schema);
