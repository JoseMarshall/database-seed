import { Schema } from 'mongoose';

import { CollectionNames, ContactInformation, Partner } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { PartnerDocument } from './model.types';
import SchemaConstructor from './schema-constructor';
import { bankAccountInformationSchema } from './sub-schema';

const partnersContactSchema = new Schema(
  {
    [ContactInformation.Email]: [
      {
        type: String,
      },
    ],
    [ContactInformation.Phone]: [
      {
        type: String,
      },
    ],
  },
  {
    _id: false,
  }
);

const partnerSchema = SchemaConstructor({
  [Partner.Name]: { type: String, trim: true, required: true },
  [Partner.Nif]: { type: String, trim: true, required: true, unique: true, lowercase: true },
  [Partner.ContactInformation]: { type: partnersContactSchema, required: true },
  [Partner.BankAccountInformation]: {
    type: bankAccountInformationSchema,
    required: true,
  },
  [Partner.Category]: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  [Partner.Processes]: [{ type: Schema.Types.ObjectId, ref: CollectionNames.Processes }],
  [Partner.UserAccount]: {
    type: Schema.Types.ObjectId,
    ref: CollectionNames.Users,
    required: true,
  },
  [Partner.TotalProcesses]: { type: Number, default: 0 },
  [Partner.TotalAcceptedProcesses]: { type: Number, default: 0 },
  [Partner.TotalPendingProcesses]: { type: Number, default: 0 },
  [Partner.TotalRejectedProcesses]: { type: Number, default: 0 },
});

partnerSchema.set('toObject', {
  virtuals: true,
});

partnerSchema.set('toJSON', {
  virtuals: true,
});

partnerSchema.post('save', incTotalCount);

export default MongoHelper.getModel<PartnerDocument>(CollectionNames.Partners, partnerSchema);
