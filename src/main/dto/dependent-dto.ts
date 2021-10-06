import {
  BankAccountInformation,
  ContactInformation,
  Dependent,
  IdentificationDocument,
  PersonalInformation,
} from '../../constants';
import { IDataTransferObject } from './dto.types';

const dependentDTO: IDataTransferObject = {
  schema: {
    [Dependent.PersonalInformation]: {
      [Dependent.PersonalInformation]: {
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
    [Dependent.ContactInformation]: {
      [Dependent.ContactInformation]: {
        Phone: ContactInformation.Phone,
        'Email*': ContactInformation.Email,
      },
    },
    [Dependent.BankAccountInformation]: {
      [Dependent.BankAccountInformation]: {
        'IBAN*': BankAccountInformation.Iban,
        'Bank Name*': BankAccountInformation.BankName,
      },
    },
    'Member Email*': Dependent.Member,
    'Kinship Degree*': Dependent.KinshipDegree,
  },
};

export default dependentDTO;
