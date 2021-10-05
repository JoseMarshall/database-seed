import { Document, FilterQuery } from 'mongoose';

import { DeletedEntity } from '../../repository.types';
import { queryGuard } from '../helpers';
import { MakeDeleteOneEntityData } from '../mongoose.types';

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
    if ((doc as any).deletedCount === 0) throw new Error(`Failed removing the entity ${query}`);
    return doc as unknown as DeletedEntity;
  };
}
