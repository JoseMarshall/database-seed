import { Round } from 'bigint-money';
import joi from 'joi';

import {
  BankAccountInformation,
  ContactInformation,
  Genders,
  IdentificationDocument,
  Money,
  PersonalInformation,
} from '../../../constants';

export const personalInformationSchema = {
  [PersonalInformation.Name]: joi.string().required(),
  [PersonalInformation.DateOfBirth]: joi.date(),
  [PersonalInformation.Gender]: joi.valid(...Object.values(Genders)),
  [PersonalInformation.Nationality]: joi.string(),
  [PersonalInformation.IdentificationDocument]: joi.object({
    [IdentificationDocument.Number]: joi.string().required(),
    [IdentificationDocument.Name]: joi.string().required(),
    [IdentificationDocument.DateOfExpiration]: joi.date().required(),
  }),
};

export const bankAccountInformationSchema = {
  [BankAccountInformation.Iban]: joi.string().length(25).required(),
  [BankAccountInformation.BankName]: joi.string().required(),
};

export const contactInformationSchema = {
  [ContactInformation.Email]: joi.string().email(),
  [ContactInformation.Phone]: joi.string(),
};

const floatNumberRegex = /^-{0,1}\d+(\.\d+|\d*)$/;

export const moneySchema = {
  [Money.Currency]: joi.string(),
  [Money.Round]: joi.valid(...Object.values(Round)),
  [Money.Value]: joi
    .alternatives()
    .try(joi.number().options({ convert: false }), joi.string().pattern(floatNumberRegex))
    .required(),
};
