import { Document, FilterQuery, UpdateQuery } from 'mongoose';

import { queryGuard } from '../helpers';
import { MakeUpdateOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeUpdateOneEntity<D extends Document, T>({
  model,
  transaction,
  populateOptions = { path: '' },
}: MakeUpdateOneEntityData<D>) {
  return async (query: FilterQuery<unknown>, body: UpdateQuery<unknown>) => {
    const doc = await queryGuard<D>(
      model
        .findOneAndUpdate(query, body as UpdateQuery<unknown>, {
          new: true,
          session: transaction?.id ? transaction : undefined,
        })
        ?.populate(populateOptions)
        .exec()
    );
    return doc.toObject() as unknown as T;
  };
}
