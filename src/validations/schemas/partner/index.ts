import joi from 'joi';

import { ContactInformation, Partner, PartnerCategories, User } from '../../../constants';
import { IPartner } from '../../../main/dto/dto.types';
import joiValidator from '../../index';
import { bankAccountInformationSchema } from '../sub-schemas';

const schema = joi
  .object({
    [Partner.Name]: joi.string().required(),
    [Partner.Nif]: joi.string().required(),
    [Partner.UserAccount]: joi
      .object({
        [User.Email]: joi.string().email().required(),
        [User.Password]: joi.string().required(),
      })
      .required()
      .unknown(true),
    [Partner.ContactInformation]: joi
      .object({
        [ContactInformation.Email]: joi.array().items(joi.string().email()).min(1).required(),
        [ContactInformation.Phone]: joi.array().items(joi.string()).min(1).required(),
      })
      .unknown(false)
      .required(),
    [Partner.BankAccountInformation]: joi.object(bankAccountInformationSchema).required(),
    [Partner.Category]: joi
      .string()
      .valid(...Object.values(PartnerCategories))
      .required(),
  })
  .required()
  .unknown(true);

export default joiValidator<IPartner>(schema);
