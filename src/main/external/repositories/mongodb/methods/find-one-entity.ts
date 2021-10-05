import { Document } from 'mongoose';

import { Common } from '../../../../../constants';
import { queryGuard } from '../helpers';
import { MakeGetOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeFindOneEntity<D extends Document, K>({
  model,
  options,
  transaction,
}: MakeGetOneEntityData<D, K>) {
  return async (query: Record<string, any>) => {
    const doc = await queryGuard<D>(
      model
        .findOne(
          query,
          {
            [Common.MongoId]: 0,
            ...(options.projection ?? {}),
          },
          { session: transaction?.id ? transaction : undefined }
        )
        ?.populate(options.populateOptions)
        .exec()
    );

    return options.formatData
      ? options.formatData(doc.toObject())
      : (doc.toObject() as unknown as K);
  };
}
