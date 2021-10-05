import { ClientSession, Document, Model } from 'mongoose';

import { IRepository } from '../repository.types';
import {
  makeCreateEntities,
  makeDeleteOneEntity,
  makeFindOneEntity,
  makeUpdateOneEntity,
} from './methods';

function BaseRepository<D extends Document, T>(
  model: Model<D>,
  transaction: ClientSession
): IRepository<T> {
  const repository: IRepository<T> = {
    async add(entities: T[]) {
      return makeCreateEntities<D, T>({ model, transaction })(entities);
    },
    async findOne(filter, options) {
      return makeFindOneEntity<D, T>({ model, options, transaction })(filter);
    },
    async remove(query) {
      return makeDeleteOneEntity<D>({ model, transaction })(query);
    },
    async update(query, body) {
      return makeUpdateOneEntity<D, T>({ model, transaction })(query, body);
    },
  };
  return repository;
}

export default BaseRepository;
