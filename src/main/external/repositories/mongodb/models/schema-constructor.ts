import { DocumentDefinition, Schema, SchemaDefinition, SchemaOptions } from 'mongoose';

import { Common } from '../../../../../constants';

export default (
  schemaDefinition: SchemaDefinition<DocumentDefinition<any>>,
  additionalDefinition?: SchemaOptions
) =>
  new Schema<any, any>(
    {
      [Common.IsDeleted]: { type: Boolean, default: false },
      [Common.RegistrationNumber]: { type: Number, required: false, unique: true, min: 1000 },
      ...schemaDefinition,
    },
    { timestamps: true, ...additionalDefinition }
  );
