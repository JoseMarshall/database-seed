import { Round } from 'bigint-money';

import { Client, ContactInformation, Currencies, Money } from '../../constants';
import { IDataTransferObject } from './dto.types';

const clientDTO: IDataTransferObject = {
  schema: {
    'Name*': Client.Name,
    'Nif*': Client.Nif,
    [Client.ContactInformation]: {
      [Client.ContactInformation]: {
        Phone: ContactInformation.Phone,
        'Email*': ContactInformation.Email,
      },
    },
    'Category*': Client.Category,
  },
  mapper: (data: any) => ({
    ...data,
    [Client.ContactInformation]: {
      ...data[Client.ContactInformation],
      [ContactInformation.Phone]:
        data[Client.ContactInformation][ContactInformation.Phone].toString(),
    },
    [Client.Nif]: data[Client.Nif].toString(),
    [Client.Agreement]: {},
    [Client.Plafond]: {
      [Money.Value]: 0,
      [Money.Currency]: Currencies.AOA,
      [Money.Round]: Round.HALF_TO_EVEN,
    },
  }),
};

export default clientDTO;
