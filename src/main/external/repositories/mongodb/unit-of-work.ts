import { IUnitOfWork } from '../repository.types';
import BaseRepository from './base-repository';
import { MongoHelper } from './helpers/mongo-helper';
import {
  ClientModel,
  DependentsModel,
  MemberModel,
  PartnerModel,
  PlanCategoryModel,
  PlanModel,
} from './models';

async function UnitOfWork() {
  const uow: IUnitOfWork = {
    transaction: null,
    makeClientRepository() {
      return BaseRepository(ClientModel, this.transaction);
    },
    makeDependentRepository() {
      return BaseRepository(DependentsModel, this.transaction);
    },
    makeMemberRepository() {
      return BaseRepository(MemberModel, this.transaction);
    },
    makePartnerRepository() {
      return BaseRepository(PartnerModel, this.transaction);
    },
    makePlanCategoryRepository() {
      return BaseRepository(PlanCategoryModel, this.transaction);
    },
    makePlanRepository() {
      return BaseRepository(PlanModel, this.transaction);
    },
    async commitChanges() {
      await this.transaction.commitTransaction();
      this.transaction.endSession();
    },
    async rollback() {
      await this.transaction.abortTransaction();
      this.transaction.endSession();
    },
    async startTransaction() {
      this.transaction = await MongoHelper.getInstance().startSession();
      this.transaction.startTransaction();
    },
  };
  return uow;
}

export default UnitOfWork;
