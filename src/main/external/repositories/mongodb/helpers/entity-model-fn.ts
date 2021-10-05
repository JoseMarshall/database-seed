import { Document } from 'mongoose';

import { Common, TotalCountCollection } from '../../../../../constants';
import TotalCollectionModel from '../models/total-collections-document';

/**
 * Increments the count of records of a collection in TotalCollections Entity
 * @param this refers to the incoming document
 */
// eslint-disable-next-line import/prefer-default-export
export async function incTotalCount(this: Document) {
  const dbSession = this.$session();
  const totalCollection = await TotalCollectionModel.findOneAndUpdate(
    {
      [TotalCountCollection.CollectionName]: this.collection[TotalCountCollection.CollectionName],
      [Common.IsDeleted]: false,
    },
    {
      $inc: {
        [TotalCountCollection.TotalCount]: 1,
        [TotalCountCollection.RegistrationNumberCounter]: 1,
      },
    },
    {
      upsert: true,
      new: true,
      session: dbSession?.id ? dbSession : undefined,
      projection: {
        [TotalCountCollection.TotalCount]: 1,
        [TotalCountCollection.RegistrationNumberCounter]: 1,
      },
    }
  );

  await this.updateOne(
    {
      $inc: {
        [Common.RegistrationNumber]:
          totalCollection[TotalCountCollection.RegistrationNumberCounter] + 999,
      },
    },
    { session: dbSession?.id ? dbSession : undefined }
  );
}
