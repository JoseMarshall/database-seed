import { Schema } from 'mongoose';

import { CollectionNames, Plan, PlanCategories, PlanTypes } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { PlanDocument } from './model.types';
import SchemaConstructor from './schema-constructor';
import { moneySchema } from './sub-schema';

const categoriesSchema = new Schema(
  {
    [PlanCategories.Cost]: {
      type: moneySchema,
      required: true,
    },
    [PlanCategories.Category]: {
      type: Schema.Types.ObjectId,
      ref: CollectionNames.PlanCategories,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const planSchema = SchemaConstructor(
  {
    [Plan.Name]: { type: String, trim: true, required: true },
    [Plan.Categories]: [categoriesSchema],
    [Plan.Clients]: [{ type: Schema.Types.ObjectId, ref: CollectionNames.Clients }],
    [Plan.Members]: [{ type: Schema.Types.ObjectId, ref: CollectionNames.Members }],
    [Plan.TotalClients]: { type: Number, default: 0, min: 0 },
    [Plan.TotalMembers]: { type: Number, default: 0, min: 0 },
    [Plan.PlanType]: {
      type: String,
      enum: Object.values(PlanTypes),
      required: true,
    },
    [Plan.Cost]: {
      type: moneySchema,
      required: true,
    },
  },
  { versionKey: false }
);

planSchema.set('toObject', {
  virtuals: true,
});

planSchema.set('toJSON', {
  virtuals: true,
});

planSchema.post('save', incTotalCount);

export default MongoHelper.getModel<PlanDocument>(CollectionNames.Plans, planSchema);
