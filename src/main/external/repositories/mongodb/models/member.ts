import { Schema } from 'mongoose';

import { CollectionNames, Member } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { MemberDocument } from './model.types';
import SchemaConstructor from './schema-constructor';
import {
  bankAccountInformationSchema,
  contactInformationSchema,
  fileSchema,
  moneySchema,
  personalInformationSchema,
  plafondSchema,
} from './sub-schema';

const memberSchema = SchemaConstructor(
  {
    [Member.PersonalInformation]: {
      type: personalInformationSchema,
      required: true,
    },
    [Member.ContactInformation]: {
      type: contactInformationSchema,
      required: true,
    },

    [Member.BankAccountInformation]: {
      type: bankAccountInformationSchema,
      required: false,
    },
    [Member.Client]: {
      type: Schema.Types.ObjectId,
      ref: CollectionNames.Clients,
      required: true,
    },
    [Member.Plan]: { type: Schema.Types.ObjectId, ref: CollectionNames.Plans },
    [Member.Processes]: [{ type: Schema.Types.ObjectId, ref: CollectionNames.Processes }],
    [Member.Dependents]: [{ type: Schema.Types.ObjectId, ref: CollectionNames.Dependents }],
    [Member.EmployeeNumber]: { type: String, required: false, trim: true },
    [Member.ProfileImage]: [{ type: fileSchema }],
    [Member.TotalPlafond]: {
      type: moneySchema,
      required: true,
    },
    [Member.Plafond]: [
      {
        type: plafondSchema,
      },
    ],
    [Member.TotalProcesses]: { type: Number, default: 0 },
    [Member.TotalAcceptedProcesses]: { type: Number, default: 0 },
    [Member.TotalPendingProcesses]: { type: Number, default: 0 },
    [Member.TotalRejectedProcesses]: { type: Number, default: 0 },
    [Member.IsClient]: { type: Boolean, default: false, select: false },
  },
  { versionKey: false }
);

memberSchema.set('toObject', {
  virtuals: true,
});

memberSchema.set('toJSON', {
  virtuals: true,
});

memberSchema.post('save', incTotalCount);

export default MongoHelper.getModel<MemberDocument>(CollectionNames.Members, memberSchema);
