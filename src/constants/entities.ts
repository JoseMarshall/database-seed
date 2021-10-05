export enum Partner {
  Name = 'name',
  Nif = 'nif',
  ContactInformation = 'contactInformation',
  BankAccountInformation = 'bankAccountInformation',
  Category = 'category',
  RegistrationNumber = 'registrationNumber',
  Processes = 'processes',
  UserAccount = 'userAccount',
  TotalProcesses = 'totalProcesses',
  TotalAcceptedProcesses = 'totalAcceptedProcesses',
  TotalPendingProcesses = 'totalPendingProcesses',
  TotalRejectedProcesses = 'totalRejectedProcesses',
  IsDeleted = 'isDeleted',
}

export enum Dependent {
  PersonalInformation = 'personalInformation',
  ContactInformation = 'contactInformation',
  BankAccountInformation = 'bankAccountInformation',
  Member = 'member',
  ProfileImage = 'profileImage',
  KinshipDegree = 'kinshipDegree',
  RegistrationNumber = 'registrationNumber',
  Plan = 'plan',
  TotalPlafond = 'totalPlafond',
  TotalProcesses = 'totalProcesses',
  TotalAcceptedProcesses = 'totalAcceptedProcesses',
  TotalPendingProcesses = 'totalPendingProcesses',
  TotalRejectedProcesses = 'totalRejectedProcesses',
}

export enum Member {
  PersonalInformation = 'personalInformation',
  ContactInformation = 'contactInformation',
  BankAccountInformation = 'bankAccountInformation',
  Client = 'client',
  Plan = 'plan',
  IsDeleted = 'isDeleted',
  IsClient = 'isClient',
  Processes = 'processes',
  Dependents = 'dependents',
  EmployeeNumber = 'employeeNumber',
  RegistrationNumber = 'registrationNumber',
  ProfileImage = 'profileImage',
  Plafond = 'plafond',
  TotalPlafond = 'totalPlafond',
  TotalProcesses = 'totalProcesses',
  TotalAcceptedProcesses = 'totalAcceptedProcesses',
  TotalPendingProcesses = 'totalPendingProcesses',
  TotalRejectedProcesses = 'totalRejectedProcesses',
}

export enum Client {
  Name = 'name',
  Nif = 'nif',
  ContactInformation = 'contactInformation',
  Agreement = 'agreement',
  Category = 'category',
  Plans = 'plans',
  PlanType = 'planType',
  Processes = 'processes',
  Plafond = 'plafond',
  RegistrationNumber = 'registrationNumber',
  Members = 'members',
  TotalMembers = 'totalMembers',
  TotalPlans = 'totalPlans',
  TotalProcesses = 'totalProcesses',
  TotalAcceptedProcesses = 'totalAcceptedProcesses',
  TotalPendingProcesses = 'totalPendingProcesses',
  TotalRejectedProcesses = 'totalRejectedProcesses',
}

export enum TotalCountCollection {
  CollectionName = 'collectionName',
  TotalCount = 'totalCount',
  RegistrationNumberCounter = 'registrationNumberCounter',
}

export enum PlanCategory {
  Name = 'name',
  Benefits = 'benefits',
  Exclusions = 'exclusions',
}

export enum Plan {
  Name = 'name',
  Categories = 'categories',
  Clients = 'clients',
  TotalClients = 'totalClients',
  Members = 'members',
  TotalMembers = 'totalMembers',
  Cost = 'cost',
  PlanType = 'planType',
}

export enum CollectionNames {
  Members = 'members',
  Partners = 'partners',
  Clients = 'clients',
  Plans = 'plans',
  Dependents = 'dependents',
  TotalCountCollections = 'totalCountCollections',
  PlanCategories = 'planCategories',
}
