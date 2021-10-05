import { Round } from 'bigint-money';
import { Schema } from 'mongoose';

import {
  AgreementDetails,
  BankAccountInformation,
  CollectionNames,
  ContactInformation,
  Currencies,
  FileUploaded,
  Genders,
  IdentificationDocument,
  IdentificationDocuments,
  Money,
  PersonalInformation,
  Plafond,
  ResetPassword,
} from '../../../../../constants';

export const resetPasswordSchema = new Schema(
  {
    [ResetPassword.Token]: {
      type: String,
      select: false,
    },
    [ResetPassword.ExpiresIn]: {
      type: Number,
      select: false,
    },
  },
  {
    _id: false,
  }
);

export const moneySchema = new Schema(
  {
    [Money.Value]: {
      type: Schema.Types.Decimal128,
      default: 0,
      required: true,
    },
    [Money.Currency]: {
      type: String,
      enum: Object.values(Currencies),
      default: Currencies.AOA,
      required: true,
      uppercase: true,
      trim: true,
    },
    [Money.Round]: {
      type: Number,
      enum: Object.values(Round),
      default: Round.HALF_TO_EVEN,
      required: false,
    },
  },
  {
    _id: false,
  }
);

export const plafondSchema = new Schema(
  {
    [Plafond.Service]: {
      type: Schema.Types.ObjectId,
      ref: CollectionNames.PlanCategories,
      required: true,
    },
    [Plafond.CurrentValue]: {
      type: moneySchema,
      required: true,
    },
    [Plafond.CaptiveValue]: {
      type: moneySchema,
      required: true,
    },
  },
  {
    _id: false,
  }
);

export const identificationDocumentSchema = new Schema(
  {
    [IdentificationDocument.Number]: { type: String, required: true },
    [IdentificationDocument.Name]: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      default: IdentificationDocuments.BI,
    },
    [IdentificationDocument.DateOfExpiration]: { type: Date, required: true },
  },
  {
    _id: false,
  }
);

export const personalInformationSchema = new Schema(
  {
    [PersonalInformation.Name]: {
      type: String,
      required: true,
      trim: true,
    },
    [PersonalInformation.DateOfBirth]: { type: Date, required: false },
    [PersonalInformation.Gender]: { type: String, enum: Object.values(Genders), required: false },
    [PersonalInformation.IdentificationDocument]: {
      type: identificationDocumentSchema,
      required: false,
    },
    [PersonalInformation.Nationality]: {
      type: String,
      trim: true,
      required: false,
    },
  },
  {
    _id: false,
  }
);

export const contactInformationSchema = new Schema(
  {
    [ContactInformation.Phone]: {
      type: String,
      trim: true,
    },
    [ContactInformation.Email]: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    _id: false,
  }
);

export const bankAccountInformationSchema = new Schema(
  {
    [BankAccountInformation.Iban]: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      max: 25,
      min: 25,
    },
    [BankAccountInformation.BankName]: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
  },
  {
    _id: false,
  }
);

export const fileSchema = new Schema(
  {
    [FileUploaded.OriginalName]: {
      type: String,
      default: 'file',
      required: true,
      trim: true,
    },
    [FileUploaded.Url]: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

export const agreementSchema = new Schema(
  {
    [AgreementDetails.File]: [{ type: fileSchema }],
    [AgreementDetails.DateStart]: {
      type: Date,
    },
    [AgreementDetails.DateEnd]: {
      type: Date,
    },
  },
  {
    _id: false,
  }
);
