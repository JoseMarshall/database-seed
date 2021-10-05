import { Document } from 'mongoose';

import { queryGuard } from '../helpers';
import { MakeCreateEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeCreateEntities<D extends Document, K>({
  model,
  transaction,
}: MakeCreateEntityData<D>) {
  return async (entities: K[]) => {
    const docs = await queryGuard<D[]>(
      model.create(entities, {
        session: transaction?.id ? transaction : undefined,
      })
    );
    return docs as unknown as K[];
  };
}
