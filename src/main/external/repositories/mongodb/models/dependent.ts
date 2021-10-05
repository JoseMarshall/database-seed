import { Schema } from 'mongoose';

import { CollectionNames, Dependent, KinshipDegrees } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { DependentDocument } from './model.types';
import SchemaConstructor from './schema-constructor';
import {
  bankAccountInformationSchema,
  contactInformationSchema,
  fileSchema,
  personalInformationSchema,
} from './sub-schema';

const dependentSchema = SchemaConstructor({
  [Dependent.PersonalInformation]: {
    type: personalInformationSchema,
    required: true,
  },
  [Dependent.ContactInformation]: {
    type: contactInformationSchema,
    required: true,
  },

  [Dependent.BankAccountInformation]: {
    type: bankAccountInformationSchema,
    required: true,
  },
  [Dependent.ProfileImage]: [{ type: fileSchema }],
  [Dependent.Member]: {
    type: Schema.Types.ObjectId,
    ref: CollectionNames.Members,
    required: true,
  },
  [Dependent.KinshipDegree]: {
    type: String,
    enum: Object.keys(KinshipDegrees),
    required: true,
  },
});

dependentSchema.set('toObject', {
  virtuals: true,
});

dependentSchema.set('toJSON', {
  virtuals: true,
});

dependentSchema.post('save', incTotalCount);

export default MongoHelper.getModel<DependentDocument>(CollectionNames.Dependents, dependentSchema);
