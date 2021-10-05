import { Schema } from 'mongoose';

import { CollectionNames, TotalCountCollection } from '../../../../../constants';
import { MongoHelper } from '../helpers/mongo-helper';
import { TotalCollectionsDocument } from './model.types';

export const totalCollectionsDocumentSchema = new Schema(
  {
    [TotalCountCollection.CollectionName]: { type: String, required: true, unique: true },
    [TotalCountCollection.TotalCount]: { type: Number, required: true, default: 1 },
    [TotalCountCollection.RegistrationNumberCounter]: {
      type: Number,
      required: false,
      select: false,
      default: 1,
    },
    isDeleted: { type: Boolean, select: false, default: false },
  },
  { timestamps: true }
);

totalCollectionsDocumentSchema.set('toObject', {
  virtuals: true,
});

totalCollectionsDocumentSchema.set('toJSON', {
  virtuals: true,
});

export default MongoHelper.getModel<TotalCollectionsDocument>(
  CollectionNames.TotalCountCollections,
  totalCollectionsDocumentSchema as any
);
