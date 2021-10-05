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
  ListConfiguration,
  Member,
  Money,
  Notification,
  NotificationTypes,
  Partner,
  Payment,
  PersonalInformation,
  Plafond,
  PlafondHistory,
  Plan,
  PlanCategories,
  PlanCategory,
  PlanTypes as __PlanTypesEnum,
  Process,
  ProcessesStatus as __ProcessesStatusEnum,
  TotalCountCollection,
  User,
  UserRoles,
  UsersNotification,
} from '../../../../../constants';

export interface TimeStamps {
  createdAt: Date;
  updatedAt: Date;
}

export type PlanTypes = __PlanTypesEnum.MetCareCliente | __PlanTypesEnum.MetCareSaude;
export type UserRole =
  | UserRoles.Admin
  | UserRoles.Supervisor
  | UserRoles.Operator
  | UserRoles.Partner;
export type NotificationType = NotificationTypes.Create | NotificationTypes.Update;
export type Gender = Genders.Male | Genders.Female | Genders.Other;
export type ProcessesStatus =
  | __ProcessesStatusEnum.Accepted
  | __ProcessesStatusEnum.Rejected
  | __ProcessesStatusEnum.Pending;

export interface UserDocument extends Document, TimeStamps {
  [User.Role]: UserRole;
  [User.Name]: string;
  [User.Email]: string;
  [User.Password]: string;
  [User.Phone]: string;
  [User.Gender]: Gender;
}

export interface NotificationDocument extends Document, TimeStamps {
  [Notification.Type]: NotificationType;
  [Notification.Process]: string;
}

export interface UserNotificationDocument extends Document, TimeStamps {
  [UsersNotification.UserEmail]: string;
  [UsersNotification.Notification]: string;
  [UsersNotification.IsRead]: boolean;
}

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
  [Plan.PlanType]: PlanTypes;
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

export interface PlafondHistoryDocument extends Document, TimeStamps {
  [PlafondHistory.Service]: PlanCategoryDocument;
  [PlafondHistory.InitialValue]: MoneyObject;
  [PlafondHistory.CurrentValue]: MoneyObject;
  [PlafondHistory.Member]: MemberDocument;
}

export interface DependentDocument extends Document, TimeStamps {
  [Dependent.PersonalInformation]: PersonalInformationDocument;
  [Dependent.ContactInformation]: ContactInformationDocument;
  [Dependent.BankAccountInformation]: BankAccountInformationDocument;
  [Dependent.ProfileImage]: string;
  [Dependent.Member]: MemberDocument;
  [Dependent.KinshipDegree]: string;
}
export interface ServicePaid {
  [Plafond.Service]: string;
  [Payment.AmountPaid]: MoneyObject;
}

export interface ProcessDocument extends Document, TimeStamps {
  [Process.Member]: MemberDocument;
  [Process.CreatedBy]: UserDocument;
  [Process.UpdatedBy]: UserDocument;
  [Process.Services]: ServicePaid[];
  [Process.Cost]: MoneyObject;
  [Process.Type]: string;
  [Process.Files]: FileUploadedDocument[];
  [Process.Status]: {
    reason?: string;
    name: ProcessesStatus;
    previousName: ProcessesStatus;
  };
}

export interface PaymentDocument extends Document, TimeStamps {
  [Payment.Process]: string;
  [Payment.TotalPaid]: MoneyObject;
  [Payment.ServicesPaid]: ServicePaid[];
}

export interface ListConfigurationDocument extends Document, TimeStamps {
  [ListConfiguration.Entity]: string;
  [ListConfiguration.DisabledColumns]: string[][];
  [ListConfiguration.EnabledColumns]: string[][];
  [ListConfiguration.UserEmail]: string;
}
