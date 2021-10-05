import { Document, FilterQuery } from 'mongoose';

import { queryGuard } from '../helpers';
import { DeletedEntity, MakeDeleteOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeDeleteOneEntity<D extends Document>({
  model,
  transaction,
}: MakeDeleteOneEntityData<D>) {
  return async (query: FilterQuery<unknown>) => {
    const doc = await queryGuard<D>(
      model
        .deleteOne(query, {
          session: transaction?.id ? transaction : undefined,
        })
        .lean()
    );
    return doc as unknown as DeletedEntity;
  };
}
