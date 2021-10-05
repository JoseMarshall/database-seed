import { Schema } from 'mongoose';

import { CollectionNames, PlafondHistory } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { PlafondHistoryDocument } from './model.types';
import SchemaConstructor from './schema-constructor';
import { moneySchema } from './sub-schema';

const plafondHistorySchema = SchemaConstructor(
  {
    [PlafondHistory.Service]: {
      type: Schema.Types.ObjectId,
      ref: CollectionNames.PlanCategories,
      required: true,
    },
    [PlafondHistory.InitialValue]: {
      type: moneySchema,
      required: true,
    },
    [PlafondHistory.CurrentValue]: {
      type: moneySchema,
      required: true,
    },
    [PlafondHistory.Member]: {
      type: Schema.Types.ObjectId,
      ref: CollectionNames.Members,
      required: true,
    },
  },
  { versionKey: false }
);

plafondHistorySchema.set('toObject', {
  virtuals: true,
});

plafondHistorySchema.set('toJSON', {
  virtuals: true,
});

plafondHistorySchema.post('save', incTotalCount);

export default MongoHelper.getModel<PlafondHistoryDocument>(
  CollectionNames.PlafondHistories,
  plafondHistorySchema
);
