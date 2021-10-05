import { Schema } from 'mongoose';

import { Benefit, CollectionNames, PlanCategory } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { PlanCategoryDocument } from './model.types';
import SchemaConstructor from './schema-constructor';

const benefitSchema = new Schema(
  {
    [Benefit.Name]: {
      type: String,
      trim: true,
      required: true,
    },
    [Benefit.Coverages]: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  {
    _id: false,
  }
);

const planCategorySchema = SchemaConstructor(
  {
    [PlanCategory.Name]: { type: String, trim: true, required: true },
    [PlanCategory.Exclusions]: [{ type: String, trim: true }],
    [PlanCategory.Benefits]: [benefitSchema],
  },
  { versionKey: false }
);

planCategorySchema.set('toObject', {
  virtuals: true,
});

planCategorySchema.set('toJSON', {
  virtuals: true,
});

planCategorySchema.post('save', incTotalCount);

export default MongoHelper.getModel<PlanCategoryDocument>(
  CollectionNames.PlanCategories,
  planCategorySchema
);
