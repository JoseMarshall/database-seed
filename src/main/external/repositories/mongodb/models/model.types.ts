import { Round } from 'bigint-money';
import { Document } from 'mongoose';

import {
  AgreementDetails,
  BankAccountInformation,
  Benefit,
  Client,
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
} from '../../../../../constants';

export interface TimeStamps {
  createdAt: Date;
  updatedAt: Date;
}

export type Gender = Genders.Male | Genders.Female | Genders.Other;
export interface MoneyObject {
  [Money.Value]: number | bigint | string;
  [Money.Currency]: string;
  [Money.Round]?: Round;
}

export interface FileUploadedDocument {
  [FileUploaded.OriginalName]: string;
  [FileUploaded.Url]: string;
}

export interface Identification {
  [IdentificationDocument.Name]: string;
  [IdentificationDocument.Number]: string;
  [IdentificationDocument.DateOfExpiration]: Date;
}
export interface PersonalInformationDocument {
  [PersonalInformation.Name]: string;
  [PersonalInformation.DateOfBirth]?: Date;
  [PersonalInformation.Nationality]?: string;
  [PersonalInformation.Gender]?: Gender;
  [PersonalInformation.IdentificationDocument]?: Identification;
}
export interface ContactInformationDocument {
  [ContactInformation.Email]?: string;
  [ContactInformation.Phone]?: string;
}

export interface BankAccountInformationDocument {
  [BankAccountInformation.BankName]: string;
  [BankAccountInformation.Iban]: string;
}

export interface PartnerContacts {
  [ContactInformation.Email]: string[];
  [ContactInformation.Phone]: string[];
}

export interface PartnerDocument extends Document, TimeStamps {
  [Partner.Name]: string;
  [Partner.Nif]: string;
  [Partner.ContactInformation]: PartnerContacts;
  [Partner.BankAccountInformation]: BankAccountInformationDocument;
  [Partner.Category]: string;
  [Partner.Processes]: string[];
  [Partner.UserAccount]: string;
  [Partner.TotalProcesses]: number;
  [Partner.TotalAcceptedProcesses]: number;
  [Partner.TotalPendingProcesses]: number;
  [Partner.TotalRejectedProcesses]: number;
}

export interface AgreementDocument {
  [AgreementDetails.File]?: FileUploadedDocument[];
  [AgreementDetails.DateStart]?: Date;
  [AgreementDetails.DateEnd]?: Date;
}

export interface BenefitsDocument {
  [Benefit.Name]: string;
  [Benefit.Coverages]: string[];
}
export interface PlanCategoryDocument extends Document, TimeStamps {
  [PlanCategory.Name]: string;
  [PlanCategory.Exclusions]: string[];
  [PlanCategory.Benefits]: BenefitsDocument[];
}

export interface IPlanCategories {
  [PlanCategories.Cost]: MoneyObject;
  [PlanCategories.Category]: PlanCategoryDocument;
}
export interface PlanDocument extends Document, TimeStamps {
  [Plan.Name]: string;
  [Plan.Categories]: IPlanCategories[];
  [Plan.Clients]: string[];
  [Plan.TotalClients]: number;
  [Plan.Members]: string[];
  [Plan.TotalMembers]: number;
  [Plan.Cost]: MoneyObject;
  [Plan.PlanType]: `${PlanTypes}`;
}

export interface ClientDocument extends Document, TimeStamps {
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
export interface TotalCollectionsDocument extends Document, TimeStamps {
  [TotalCountCollection.CollectionName]: string;
  [TotalCountCollection.TotalCount]: number;
  [TotalCountCollection.RegistrationNumberCounter]: number;
}

export interface PlafondDocument {
  [Plafond.Service]: PlanCategoryDocument;
  [Plafond.CurrentValue]: MoneyObject;
  [Plafond.CaptiveValue]: MoneyObject;
}
export interface MemberDocument extends Document, TimeStamps {
  [Member.PersonalInformation]: PersonalInformationDocument;
  [Member.ContactInformation]: ContactInformationDocument;
  [Member.BankAccountInformation]: BankAccountInformationDocument;
  [Member.Client]: ClientDocument;
  [Member.Plan]: PlanDocument;
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
}

export interface DependentDocument extends Document, TimeStamps {
  [Dependent.PersonalInformation]: PersonalInformationDocument;
  [Dependent.ContactInformation]: ContactInformationDocument;
  [Dependent.BankAccountInformation]: BankAccountInformationDocument;
  [Dependent.ProfileImage]: string;
  [Dependent.Member]: MemberDocument;
  [Dependent.KinshipDegree]: string;
}
