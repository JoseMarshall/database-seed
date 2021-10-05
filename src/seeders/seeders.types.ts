import { ReadStream } from 'fs';

type IReaderOptions =
  | {
      schema: Record<string, any>;
      map?: never;
    }
  | {
      map: Record<string, any>;
      schema?: never;
    };

interface IReaderReturn {
  rows: any[];
  errors: any[];
}

export type IReader = (
  file: string | ReadStream,
  options?: IReaderOptions
) => Promise<IReaderReturn>;

export interface ISeeder {
  reader: IReader;
  path: string;
}
