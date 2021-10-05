import { Common, TimeStamps } from '../../../constants';
import {
  IClient,
  IDependent,
  IMember,
  IPartner,
  IPlafondHistory,
  IPlan,
  IPlanCategory,
  IUser,
} from '../../../dto/dto.types';

export interface GetAllEntitiesData<T> {
  data: ReadonlyArray<T>;
  count: number;
}

export interface DeletedEntity {
  [Common.Id]: string;
  [Common.IsDeleted]: boolean;
  [TimeStamps.CreatedAt]: string;
  [TimeStamps.UpdatedAt]: string;
}

export interface IRepository<T> {
  add(entity: T): Promise<T>;
  update(query: Record<string, any>, body: Record<string, any>): Promise<T>;
  remove(query: Record<string, any>): Promise<DeletedEntity>;
  findOne<O>(filter: Record<string, any>, options?: O): Promise<T>;
}

export interface IUnitOfWork {
  transaction: unknown;
  makeClientRepository: () => IRepository<IClient>;
  makeDependentRepository: () => IRepository<IDependent>;
  makeMemberRepository: () => IRepository<IMember>;
  makePartnerRepository: () => IRepository<IPartner>;
  makePlafondHistoryRepository: () => IRepository<IPlafondHistory>;
  makePlanCategoryRepository: () => IRepository<IPlanCategory>;
  makePlanRepository: () => IRepository<IPlan>;
  makeUserRepository: () => IRepository<IUser>;
  commitChanges(): Promise<void>;
  rollback(): Promise<void>;
  startTransaction(): Promise<void>;
}
