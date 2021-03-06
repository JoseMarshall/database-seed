export enum Common {
  Id = 'id',
  MongoId = '_id',
  IsDeleted = 'isDeleted',
  RegistrationNumber = 'registrationNumber',
}

export enum TimeStamps {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export enum Money {
  Value = 'value',
  Currency = 'currency',
  Round = 'round',
}

export enum PartnerCategories {
  Hospital = 'hospital',
  Clinic = 'clinic',
  Drugstore = 'drugstore',
  Dentist = 'dentist',
  Oculist = 'oculist',
  Other = 'other',
}

export enum PersonalInformation {
  Name = 'name',
  DateOfBirth = 'dateOfBirth',
  Gender = 'gender',
  IdentificationDocument = 'identificationDocument',
  Nationality = 'nationality',
  Occupation = 'occupation',
}

export enum IdentificationDocument {
  Name = 'name',
  IdentificationName = 'identificationName',
  Number = 'number',
  DateOfExpiration = 'dateOfExpiration',
}

export enum AgreementDetails {
  File = 'file',
  DateStart = 'dateStart',
  DateEnd = 'dateEnd',
}

export enum FileUploaded {
  OriginalName = 'originalName',
  Url = 'url',
}

export enum ContactInformation {
  Phone = 'phone',
  Email = 'email',
}

export enum BankAccountInformation {
  Iban = 'iban',
  BankName = 'bankName',
}

export enum Currencies {
  AOA = 'AOA',
  EUR = 'EUR',
  USD = 'USD',
}

export enum Genders {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum ClientCategories {
  Private = 'private',
  Corporative = 'corporative',
}

export enum IdentificationDocuments {
  BI = 'bi',
}

export enum Benefit {
  Name = 'name',
  Coverages = 'coverages',
}

export enum PlanCategories {
  Cost = 'cost',
  Category = 'category',
}

export enum PlanTypes {
  MetCareSaude = 'MetCare-Saude',
  MetCareCliente = 'MetCare-Cliente',
}

export enum ResetPassword {
  Token = 'token',
  ExpiresIn = 'expiresIn',
}

export enum Plafond {
  Service = 'service',
  InitialValue = 'initialValue',
  CurrentValue = 'currentValue',
  CaptiveValue = 'captiveValue',
}

export enum Nationalities {
  Afghan = 'Afghan',
  Albanian = 'Albanian',
  Algerian = 'Algerian',
  American = 'American',
  Andorran = 'Andorran',
  Angolan = 'Angolan',
  Anguillan = 'Anguillan',
  Argentine = 'Argentine',
  Armenian = 'Armenian',
  Australian = 'Australian',
  Austrian = 'Austrian',
  Azerbaijani = 'Azerbaijani',
  Bahamian = 'Bahamian',
  Bahraini = 'Bahraini',
  Bangladeshi = 'Bangladeshi',
  Barbadian = 'Barbadian',
  Belarusian = 'Belarusian',
  Belgian = 'Belgian',
  Belizean = 'Belizean',
  Beninese = 'Beninese',
  Bermudian = 'Bermudian',
  Bhutanese = 'Bhutanese',
  Bolivian = 'Bolivian',
  Botswanan = 'Botswanan',
  Brazilian = 'Brazilian',
  British = 'British',
  BritishVirginIslander = 'British Virgin Islander',
  Bruneian = 'Bruneian',
  Bulgarian = 'Bulgarian',
  Burkinan = 'Burkinan',
  Burmese = 'Burmese',
  Burundian = 'Burundian',
  Cambodian = 'Cambodian',
  Cameroonian = 'Cameroonian',
  Canadian = 'Canadian',
  CapeVerdean = 'Cape Verdean',
  CaymanIslander = 'Cayman Islander',
  CentralAfrican = 'Central African',
  Chadian = 'Chadian',
  Chilean = 'Chilean',
  Chinese = 'Chinese',
  CitizenofAntiguaandBarbuda = 'Citizen of Antigua and Barbuda',
  CitizenofBosniaandHerzegovina = 'Citizen of Bosnia and Herzegovina',
  CitizenofGuineaBissau = 'Citizen of Guinea-Bissau',
  CitizenofKiribati = 'Citizen of Kiribati',
  CitizenofSeychelles = 'Citizen of Seychelles',
  CitizenoftheDominicanRepublic = 'Citizen of the Dominican Republic',
  CitizenofVanuatu = 'Citizen of Vanuatu',
  Colombian = 'Colombian',
  Comoran = 'Comoran',
  CongoleseCongo = 'Congolese (Congo)',
  CongoleseDRC = 'Congolese (DRC)',
  CookIslander = 'Cook Islander',
  CostaRican = 'Costa Rican',
  Croatian = 'Croatian',
  Cuban = 'Cuban',
  Cymraes = 'Cymraes',
  Cymro = 'Cymro',
  Cypriot = 'Cypriot',
  Czech = 'Czech',
  Danish = 'Danish',
  Djiboutian = 'Djiboutian',
  Dominican = 'Dominican',
  Dutch = 'Dutch',
  EastTimorese = 'East Timorese',
  Ecuadorean = 'Ecuadorean',
  Egyptian = 'Egyptian',
  Emirati = 'Emirati',
  English = 'English',
  EquatorialGuinean = 'Equatorial Guinean',
  Eritrean = 'Eritrean',
  Estonian = 'Estonian',
  Ethiopian = 'Ethiopian',
  Faroese = 'Faroese',
  Fijian = 'Fijian',
  Filipino = 'Filipino',
  Finnish = 'Finnish',
  French = 'French',
  Gabonese = 'Gabonese',
  Gambian = 'Gambian',
  Georgian = 'Georgian',
  German = 'German',
  Ghanaian = 'Ghanaian',
  Gibraltarian = 'Gibraltarian',
  Greek = 'Greek',
  Greenlandic = 'Greenlandic',
  Grenadian = 'Grenadian',
  Guamanian = 'Guamanian',
  Guatemalan = 'Guatemalan',
  Guinean = 'Guinean',
  Guyanese = 'Guyanese',
  Haitian = 'Haitian',
  Honduran = 'Honduran',
  HongKonger = 'Hong Konger',
  Hungarian = 'Hungarian',
  Icelandic = 'Icelandic',
  Indian = 'Indian',
  Indonesian = 'Indonesian',
  Iranian = 'Iranian',
  Iraqi = 'Iraqi',
  Irish = 'Irish',
  Israeli = 'Israeli',
  Italian = 'Italian',
  Ivorian = 'Ivorian',
  Jamaican = 'Jamaican',
  Japanese = 'Japanese',
  Jordanian = 'Jordanian',
  Kazakh = 'Kazakh',
  Kenyan = 'Kenyan',
  Kittitian = 'Kittitian',
  Kosovan = 'Kosovan',
  Kuwaiti = 'Kuwaiti',
  Kyrgyz = 'Kyrgyz',
  Lao = 'Lao',
  Latvian = 'Latvian',
  Lebanese = 'Lebanese',
  Liberian = 'Liberian',
  Libyan = 'Libyan',
  Liechtensteincitizen = 'Liechtenstein citizen',
  Lithuanian = 'Lithuanian',
  Luxembourger = 'Luxembourger',
  Macanese = 'Macanese',
  Macedonian = 'Macedonian',
  Malagasy = 'Malagasy',
  Malawian = 'Malawian',
  Malaysian = 'Malaysian',
  Maldivian = 'Maldivian',
  Malian = 'Malian',
  Maltese = 'Maltese',
  Marshallese = 'Marshallese',
  Martiniquais = 'Martiniquais',
  Mauritanian = 'Mauritanian',
  Mauritian = 'Mauritian',
  Mexican = 'Mexican',
  Micronesian = 'Micronesian',
  Moldovan = 'Moldovan',
  Monegasque = 'Monegasque',
  Mongolian = 'Mongolian',
  Montenegrin = 'Montenegrin',
  Montserratian = 'Montserratian',
  Moroccan = 'Moroccan',
  Mosotho = 'Mosotho',
  Mozambican = 'Mozambican',
  Namibian = 'Namibian',
  Nauruan = 'Nauruan',
  Nepalese = 'Nepalese',
  NewZealander = 'New Zealander',
  Nicaraguan = 'Nicaraguan',
  Nigerian = 'Nigerian',
  Nigerien = 'Nigerien',
  Niuean = 'Niuean',
  NorthKorean = 'North Korean',
  NorthernIrish = 'Northern Irish',
  Norwegian = 'Norwegian',
  Omani = 'Omani',
  Pakistani = 'Pakistani',
  Palauan = 'Palauan',
  Palestinian = 'Palestinian',
  Panamanian = 'Panamanian',
  PapuaNewGuinean = 'Papua New Guinean',
  Paraguayan = 'Paraguayan',
  Peruvian = 'Peruvian',
  PitcairnIslander = 'Pitcairn Islander',
  Polish = 'Polish',
  Portuguese = 'Portuguese',
  Prydeinig = 'Prydeinig',
  PuertoRican = 'Puerto Rican',
  Qatari = 'Qatari',
  Romanian = 'Romanian',
  Russian = 'Russian',
  Rwandan = 'Rwandan',
  Salvadorean = 'Salvadorean',
  Sammarinese = 'Sammarinese',
  Samoan = 'Samoan',
  SaoTomean = 'Sao Tomean',
  SaudiArabian = 'Saudi Arabian',
  Scottish = 'Scottish',
  Senegalese = 'Senegalese',
  Serbian = 'Serbian',
  SierraLeonean = 'Sierra Leonean',
  Singaporean = 'Singaporean',
  Slovak = 'Slovak',
  Slovenian = 'Slovenian',
  SolomonIslander = 'Solomon Islander',
  Somali = 'Somali',
  SouthAfrican = 'South African',
  SouthKorean = 'South Korean',
  SouthSudanese = 'South Sudanese',
  Spanish = 'Spanish',
  SriLankan = 'Sri Lankan',
  StHelenian = 'St Helenian',
  StLucian = 'St Lucian',
  Stateless = 'Stateless',
  Sudanese = 'Sudanese',
  Surinamese = 'Surinamese',
  Swazi = 'Swazi',
  Swedish = 'Swedish',
  Swiss = 'Swiss',
  Syrian = 'Syrian',
  Taiwanese = 'Taiwanese',
  Tajik = 'Tajik',
  Tanzanian = 'Tanzanian',
  Thai = 'Thai',
  Togolese = 'Togolese',
  Tongan = 'Tongan',
  Trinidadian = 'Trinidadian',
  Tristanian = 'Tristanian',
  Tunisian = 'Tunisian',
  Turkish = 'Turkish',
  Turkmen = 'Turkmen',
  TurksandCaicosIslander = 'Turks and Caicos Islander',
  Tuvaluan = 'Tuvaluan',
  Ugandan = 'Ugandan',
  Ukrainian = 'Ukrainian',
  Uruguayan = 'Uruguayan',
  Uzbek = 'Uzbek',
  Vaticancitizen = 'Vatican citizen',
  Venezuelan = 'Venezuelan',
  Vietnamese = 'Vietnamese',
  Vincentian = 'Vincentian',
  Wallisian = 'Wallisian',
  Welsh = 'Welsh',
  Yemeni = 'Yemeni',
  Zambian = 'Zambian',
  Zimbabwean = 'Zimbabwean',
}

export enum KinshipDegrees {
  GreatGrandParent = 'Great-Grand Parent',
  GreatGrandChild = 'Great-Grand Child',
  GrandParent = 'Grand Parent',
  GrandChild = 'Grand Child',
  Parent = 'Parent',
  Child = 'Child',
  FullSibling = 'Full-Sibling',
  HalfSibling = 'Half-Sibling',
  SiblingCousin = 'Sibling-Cousin',
  Consort = 'Consort',
  BrotherInLaw = 'Bother-in-Law',
  SisterInLaw = 'Sister-in-Law',
  ParentInLaw = 'Parent-in-Law',
  SonInLaw = 'Son-in-Law',
  DaughterInLaw = 'Daughter-in-Law',
  Aunt = 'Aunt',
  Uncle = 'Uncle',
  Cousin = 'Cousin',
  Niece = 'Niece',
  Nephew = 'Nephew',
  GreatAunt = 'Great-Aunt',
  GreatUncle = 'Great-Uncle',
  GreatNiece = 'Great-Niece',
  GreatNephew = 'Great-Nephew',
}

export enum Cost {
  Value = 'value',
  Currency = 'currency',
  Round = 'round',
}
