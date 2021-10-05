import { Schema } from 'mongoose';

import { Client, ClientCategories, CollectionNames } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { ClientDocument } from './model.types';
import SchemaConstructor from './schema-constructor';
import { agreementSchema, contactInformationSchema, moneySchema } from './sub-schema';

const clientSchema = SchemaConstructor(
  {
    [Client.Name]: { type: String, trim: true, required: true },
    [Client.Nif]: { type: String, trim: true, required: true, unique: true, lowercase: true },
    [Client.ContactInformation]: { type: contactInformationSchema, required: true },
    [Client.Category]: {
      type: String,
      enum: Object.values(ClientCategories),
      required: true,
    },
    [Client.Plans]: [{ type: Schema.Types.ObjectId, ref: CollectionNames.Plans, required: false }],
    [Client.Processes]: [{ type: Schema.Types.ObjectId, ref: CollectionNames.Processes }],
    [Client.Members]: [{ type: Schema.Types.ObjectId, ref: CollectionNames.Members }],
    [Client.Agreement]: {
      type: agreementSchema,
      required: true,
    },
    [Client.Plafond]: {
      type: moneySchema,
      required: true,
    },
    [Client.TotalMembers]: { type: Number, default: 0 },
    [Client.TotalProcesses]: { type: Number, default: 0 },
    [Client.TotalAcceptedProcesses]: { type: Number, default: 0 },
    [Client.TotalPendingProcesses]: { type: Number, default: 0 },
    [Client.TotalRejectedProcesses]: { type: Number, default: 0 },
  },
  { versionKey: false }
);

clientSchema.set('toObject', {
  virtuals: true,
});

clientSchema.set('toJSON', {
  virtuals: true,
});

clientSchema.post('save', incTotalCount);

export default MongoHelper.getModel<ClientDocument>(CollectionNames.Clients, clientSchema);
