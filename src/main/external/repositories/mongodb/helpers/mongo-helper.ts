import mongoose, { Collection, Model, model, Query, Schema } from 'mongoose';

mongoose.Promise = global.Promise;

const client = mongoose;

export const MongoHelper = {
  async connect(): Promise<void> {
    if (process.env.MONGO_URL)
      await client.connect(process.env.MONGO_URL!, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
  },
  async disconnect(): Promise<void> {
    await client?.disconnect();
  },
  getCollection(name: string): Collection | undefined {
    return client?.connection.collection(name);
  },
  clearCollection(name: string): void {
    client?.connection.collection(name).deleteMany({});
  },
  getModel<T>(name: string, schema: Schema<T>): Model<T> {
    return client?.models[name] ?? model<T, Model<T>>(name, schema, name);
  },
  getInstance() {
    return client;
  },
};

export async function queryGuard<T>(fn: Query<T, any> | Promise<T | null>): Promise<T> {
  const data = await fn;
  if (!data) throw new Error();

  return data;
}

if (client.connection.readyState === 0) {
  MongoHelper.connect()
    .then()
    .catch(_error => {
      if (process.env.NODE_ENV !== 'test') {
        process.exit(1);
      }
    });
}

process.on('uncaughtException', _error => {
  process.exit(1);
});
