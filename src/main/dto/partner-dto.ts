import {
  BankAccountInformation,
  ContactInformation,
  Genders,
  Partner,
  User,
  UserRoles,
} from '../../constants';
import { IDataTransferObject } from './dto.types';

const partnerDTO: IDataTransferObject = {
  schema: {
    'Name*': Partner.Name,
    'Nif*': Partner.Nif,
    [Partner.ContactInformation]: {
      [Partner.ContactInformation]: {
        'Phone Numbers*': ContactInformation.Phone,
        'Email Addresses*': ContactInformation.Email,
      },
    },
    [Partner.BankAccountInformation]: {
      [Partner.BankAccountInformation]: {
        'IBAN*': BankAccountInformation.Iban,
        'Bank Name*': BankAccountInformation.BankName,
      },
    },
    [Partner.UserAccount]: {
      [Partner.UserAccount]: {
        'Login Email*': User.Email,
        'Password*': User.Password,
      },
    },
    'Partner Category*': Partner.Category,
  },

  mapper: (data: any) => {
    const emails = data[Partner.ContactInformation][ContactInformation.Email]
      .split(';')
      .map((email: string) => email.trim());
    const phoneNumbers = data[Partner.ContactInformation][ContactInformation.Phone]
      .split(';')
      .map((phone: string) => phone.trim());
    return {
      ...data,
      [Partner.Nif]: data[Partner.Nif].toString(),
      [Partner.ContactInformation]: {
        [ContactInformation.Phone]: phoneNumbers,
        [ContactInformation.Email]: emails,
      },
      [Partner.UserAccount]: {
        ...data[Partner.UserAccount],
        [User.Name]: data[Partner.Name],
        [User.Phone]: phoneNumbers[0],
        [User.Gender]: Genders.Other,
        [User.Role]: UserRoles.Partner,
        [User.Password]: data[Partner.UserAccount][User.Password].toString(),
      },
    };
  },
};

export default partnerDTO;
