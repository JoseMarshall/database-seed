import joi from 'joi';

import { Client, ClientCategories } from '../../../constants';
import { IClient } from '../../../main/dto/dto.types';
import joiValidator from '../../index';
import { contactInformationSchema } from '../sub-schemas';

const schema = joi
  .object({
    [Client.Name]: joi.string().required(),
    [Client.Nif]: joi.string().required(),
    [Client.ContactInformation]: joi.object(contactInformationSchema).required(),
    [Client.Category]: joi.valid(...Object.values(ClientCategories)).required(),
  })
  .required()
  .unknown(true);

export default joiValidator<IClient>(schema);
