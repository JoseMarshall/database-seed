import { Common, TimeStamps } from '../../../constants';
import {
  IClient,
  IDependent,
  IMember,
  IPartner,
  IPlan,
  IPlanCategory,
  IUser,
} from '../../../dto/dto.types';

export interface GetAllEntitiesData<T> {
  data: ReadonlyArray<T>;
  count: number;
}

export interface DeletedEntity {
  n: number;
  opTime: {
    ts: string;
    t: number;
  };
  electionId: string;
  ok: number;
  $clusterTime: {
    clusterTime: string;
    signature: {
      hash: string;
      keyId: string;
    };
  };
  operationTime: string;
  deletedCount: number;
}

export interface IRepository<T> {
  add(entities: T[]): Promise<T[]>;
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
  makeUserRepository: () => IRepository<IUser>;
  makePlanCategoryRepository: () => IRepository<IPlanCategory>;
  makePlanRepository: () => IRepository<IPlan>;
  commitChanges(): Promise<void>;
  rollback(): Promise<void>;
  startTransaction(): Promise<void>;
}
