import { Round } from 'bigint-money';

import {
  AgreementDetails,
  BankAccountInformation,
  Benefit,
  Client,
  Common,
  ContactInformation,
  Dependent,
  FileUploaded,
  Genders,
  IdentificationDocument,
  Member,
  Money,
  Partner,
  PersonalInformation,
  Plafond,
  Plan,
  PlanCategories,
  PlanCategory,
  PlanTypes,
  TotalCountCollection,
  User,
  UserRoles,
} from '../../constants';

interface MoneyObject {
  [Money.Value]: number | bigint | string;
  [Money.Currency]: string;
  [Money.Round]?: Round;
}

interface FileUploadedDocument {
  [FileUploaded.OriginalName]: string;
  [FileUploaded.Url]: string;
}

interface Identification {
  [IdentificationDocument.Name]: string;
  [IdentificationDocument.Number]: string;
  [IdentificationDocument.DateOfExpiration]: Date;
}

interface PersonalInformationDocument {
  [PersonalInformation.Name]: string;
  [PersonalInformation.DateOfBirth]?: Date;
  [PersonalInformation.Nationality]?: string;
  [PersonalInformation.Gender]?: `${Genders}`;
  [PersonalInformation.IdentificationDocument]?: Identification;
}

interface ContactInformationDocument {
  [ContactInformation.Email]?: string;
  [ContactInformation.Phone]?: string;
}

interface BankAccountInformationDocument {
  [BankAccountInformation.BankName]: string;
  [BankAccountInformation.Iban]: string;
}

interface PartnerContacts {
  [ContactInformation.Email]: string[];
  [ContactInformation.Phone]: string[];
}

interface AgreementDocument {
  [AgreementDetails.File]?: FileUploadedDocument[];
  [AgreementDetails.DateStart]?: Date;
  [AgreementDetails.DateEnd]?: Date;
}

interface BenefitsDocument {
  [Benefit.Name]: string;
  [Benefit.Coverages]: string[];
}

interface IPlanCategories {
  [PlanCategories.Cost]: MoneyObject;
  [PlanCategories.Category]: string;
}

interface PlafondDocument {
  [Plafond.Service]: string;
  [Plafond.CurrentValue]: MoneyObject;
  [Plafond.CaptiveValue]: MoneyObject;
}

export interface TimeStamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  [Common.Id]: string;
  [User.Role]: `${UserRoles}`;
  [User.Name]: string;
  [User.Email]: string;
  [User.Password]: string;
  [User.Phone]: string;
  [User.Gender]: `${Genders}`;
}
export interface IPartner {
  [Partner.Name]: string;
  [Partner.Nif]: string;
  [Partner.ContactInformation]: PartnerContacts;
  [Partner.BankAccountInformation]: BankAccountInformationDocument;
  [Partner.Category]: string;
  [Partner.Processes]: string[];
  [Partner.UserAccount]: string | IUser;
  [Partner.TotalProcesses]: number;
  [Partner.TotalAcceptedProcesses]: number;
  [Partner.TotalPendingProcesses]: number;
  [Partner.TotalRejectedProcesses]: number;
}

export interface IPlanCategory {
  [Common.Id]: string;
  [PlanCategory.Name]: string;
  [PlanCategory.Exclusions]: string[];
  [PlanCategory.Benefits]: BenefitsDocument[];
}

export interface IPlan {
  [Common.Id]: string;
  [Plan.Name]: string;
  [Plan.Categories]: IPlanCategories[];
  [Plan.Clients]: string[];
  [Plan.TotalClients]: number;
  [Plan.Members]: string[];
  [Plan.TotalMembers]: number;
  [Plan.Cost]: MoneyObject;
  [Plan.PlanType]: `${PlanTypes}`;
}

export interface IClient {
  [Common.Id]: string;
  [Client.Name]: string;
  [Client.Nif]: string;
  [Client.ContactInformation]: ContactInformationDocument;
  [Client.Agreement]: AgreementDocument;
  [Client.Category]: string;
  [Client.Plans]: string[];
  [Client.Plafond]: MoneyObject;
  [Client.Members]: string[];
  [Client.Processes]: string[];
  [Client.TotalMembers]: number;
  [Client.TotalProcesses]: number;
  [Client.TotalAcceptedProcesses]: number;
  [Client.TotalPendingProcesses]: number;
  [Client.TotalRejectedProcesses]: number;
}

export interface ITotalCollections {
  [TotalCountCollection.CollectionName]: string;
  [TotalCountCollection.TotalCount]: number;
  [TotalCountCollection.RegistrationNumberCounter]: number;
}

export interface IMember {
  [Common.Id]: string;
  [Common.MongoId]: string;
  [Member.PersonalInformation]: PersonalInformationDocument;
  [Member.ContactInformation]: ContactInformationDocument;
  [Member.BankAccountInformation]: BankAccountInformationDocument;
  [Member.Client]: string;
  [Member.Plan]: string;
  [Member.Processes]: string[];
  [Member.Dependents]: string[];
  [Member.EmployeeNumber]: string;
  [Member.RegistrationNumber]: string;
  [Member.ProfileImage]: string;
  [Member.TotalPlafond]: MoneyObject;
  [Member.Plafond]: PlafondDocument[];
  [Member.TotalProcesses]: number;
  [Member.TotalAcceptedProcesses]: number;
  [Member.TotalPendingProcesses]: number;
  [Member.TotalRejectedProcesses]: number;
  [Member.IsClient]: boolean;
}

export interface IDependent {
  [Common.Id]: string;
  [Dependent.PersonalInformation]: PersonalInformationDocument;
  [Dependent.ContactInformation]: ContactInformationDocument;
  [Dependent.BankAccountInformation]: BankAccountInformationDocument;
  [Dependent.ProfileImage]: string;
  [Dependent.Member]: string;
  [Dependent.KinshipDegree]: string;
}

export interface IDataTransferObject {
  schema: Record<string, any>;
  mapper?: <K>(data: K) => K;
  reducer?: (acc: any[], row: any, index?: number) => any;
}
