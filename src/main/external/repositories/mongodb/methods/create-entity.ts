import { Document } from 'mongoose';

import { queryGuard } from '../helpers';
import { MakeCreateEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeCreateEntity<D extends Document, K>({
  model,
  transaction,
}: MakeCreateEntityData<D>) {
  return async (body: K) => {
    const doc = (
      await queryGuard<D[]>(
        model.create([body], {
          session: transaction?.id ? transaction : undefined,
        })
      )
    )[0];
    return doc as unknown as K;
  };
}
