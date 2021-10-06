import { ObjectSchema } from 'joi';

function JoiValidator<T>(schema: ObjectSchema) {
  return async (payload: unknown) => (await schema.validateAsync(payload)) as Promise<T>;
}

export default JoiValidator;
