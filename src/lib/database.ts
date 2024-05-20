import mongoose from 'mongoose';
import { ServerEnv } from './env/server.env';

export default async function connectToDatabase() {
  try {
    await mongoose.connect(ServerEnv.MONGO_URI, {
      dbName: ServerEnv.MONGO_DATABASE,
    });
    console.log('Connected to Database');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
