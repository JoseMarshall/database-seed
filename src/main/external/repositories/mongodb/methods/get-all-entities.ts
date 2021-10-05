import { Document } from 'mongoose';

import { Common, TimeStamps } from '../../../../../constants';
import { safeParseInt } from '../../../../../utils';
import { queryGuard } from '../helpers';
import { GetAllEntitiesAggregatedData, MakeGetAllEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeGetAllEntities<D extends Document, T>({
  model,
  options,
}: MakeGetAllEntityData<D, T>) {
  return async (query: {
    page: string;
    limit?: string;
    sortBy?: string;
    includeDeleted?: string;
  }) => {
    const { page, limit, sortBy, includeDeleted, ...filteredQuery } = query;
    const pageNumber = safeParseInt(page, 10);
    const docPerPage = safeParseInt(limit ?? '0', 10);
    const skip = docPerPage > 0 ? docPerPage * (pageNumber - 1) : 0;

    const formattedQuery = options.formatQuery ? options.formatQuery(filteredQuery) : filteredQuery;

    const document = (await queryGuard<D[] | GetAllEntitiesAggregatedData<D>[]>(
      model
        .aggregate([
          {
            $facet: {
              data: [
                ...(options.lookup ?? []),
                {
                  $match: includeDeleted
                    ? { ...formattedQuery }
                    : { isDeleted: false, ...formattedQuery },
                },
                { $sort: JSON.parse(sortBy ?? `{"${TimeStamps.UpdatedAt}":-1}`) },
                { $skip: skip },
                { $limit: docPerPage || 15 },
                {
                  $project: {
                    [Common.MongoId]: 0,
                    ...(options.projection ?? {}),
                  },
                },
              ],
              count: [
                ...(options.lookup ?? []),
                {
                  $match: includeDeleted
                    ? { ...formattedQuery }
                    : { isDeleted: false, ...formattedQuery },
                },
                { $count: 'total' },
              ],
            },
          },
        ])
        .exec()
    )) as GetAllEntitiesAggregatedData<D>[];

    return {
      data: options.formatData
        ? options.formatData(document[0].data)
        : (document[0].data as unknown as ReadonlyArray<T>),
      count: document[0].count[0]?.total ?? 0,
    };
  };
}
