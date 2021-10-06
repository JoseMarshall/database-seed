import { Round } from 'bigint-money';

import {
  BankAccountInformation,
  ContactInformation,
  Currencies,
  IdentificationDocument,
  Member,
  Money,
  PersonalInformation,
} from '../constants';
import { IDataTransferObject } from './dto.types';

const memberDTO: IDataTransferObject = {
  schema: {
    [Member.PersonalInformation]: {
      [Member.PersonalInformation]: {
        'Name*': PersonalInformation.Name,
        'Date of Birth*': PersonalInformation.DateOfBirth,
        'Gender*': PersonalInformation.Gender,
        [PersonalInformation.IdentificationDocument]: {
          [PersonalInformation.IdentificationDocument]: {
            'Identification Doc*': IdentificationDocument.Name,
            'Identification Doc. Number*': IdentificationDocument.Number,
            'Ident. Doc. Expiraion Date*': IdentificationDocument.DateOfExpiration,
          },
        },
        Nationality: PersonalInformation.Nationality,
      },
    },
    [Member.ContactInformation]: {
      [Member.ContactInformation]: {
        Phone: ContactInformation.Phone,
        'Email*': ContactInformation.Email,
      },
    },
    [Member.BankAccountInformation]: {
      [Member.BankAccountInformation]: {
        'IBAN*': BankAccountInformation.Iban,
        'Bank Name*': BankAccountInformation.BankName,
      },
    },
    'Client Email*': Member.Client,
    'Plan Name': Member.Plan,
    'Employee Number': Member.EmployeeNumber,
    'Is Client*': Member.IsClient,
  },

  mapper: data => ({
    ...data,
    [Member.IsClient]: (data as any)[Member.IsClient] === 'true',
    [Member.TotalPlafond]: {
      [Money.Value]: 0,
      [Money.Currency]: Currencies.AOA,
      [Money.Round]: Round.HALF_TO_EVEN,
    },
  }),
};

export default memberDTO;
