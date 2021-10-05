import { ClientSession, Document, Model, PopulateOptions } from 'mongoose';

export interface MakeGetAllEntitiesDependencies<K> {
  projection?: Record<string, 0 | 1 | boolean>;
  formatData?: (data: ReadonlyArray<any>) => ReadonlyArray<K>;
  formatQuery?: (query: Record<string, string> | {}) => Record<string, unknown>;
  lookup?: ReadonlyArray<Record<string, unknown>>;
}

export interface MakeGetOneEntityDependencies<K> {
  projection?: Record<string, 0 | 1 | boolean>;
  populateOptions?: Array<PopulateOptions> | PopulateOptions;
  formatData?: (data: any) => K;
}

interface TotalCount {
  total: number;
}

export interface GetAllEntitiesAggregatedData<T> {
  data: ReadonlyArray<T>;
  count: TotalCount[];
}

export interface GetAllEntitiesData<T> {
  data: ReadonlyArray<T>;
  count: number;
}

export interface MakeGetOneEntityData<D extends Document, K> {
  model: Model<D>;
  options: MakeGetOneEntityDependencies<K>;
  transaction?: ClientSession;
}

export interface MakeGetAllEntityData<D extends Document, K> {
  model: Model<D>;
  options: MakeGetAllEntitiesDependencies<K>;
}

export interface MakeUpdateOneEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
  populateOptions?: Array<PopulateOptions> | PopulateOptions;
}

export interface MakeCreateEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
}

export interface MakeDeleteOneEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
}
