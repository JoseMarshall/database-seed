import { ReadStream, WriteStream } from 'fs';

type IReaderOptions =
  | {
      schema: Record<string, any>;
      map?: never;
    }
  | {
      map: Record<string, any>;
      schema?: never;
    };

interface IReaderErrors {
  row: string | number;
  column: string | number;
  error: string;
  value: any;
}
interface IReaderReturn<T> {
  rows: T[];
  errors: IReaderErrors[];
}

export type IReader<T> = (
  file: string | ReadStream,
  options?: IReaderOptions
) => Promise<IReaderReturn<T>>;

export interface ISeeder<T> {
  reader: IReader<T>;
  path: string;
  validator: (payload: T) => Promise<T>;
  report: WriteStream;
}
