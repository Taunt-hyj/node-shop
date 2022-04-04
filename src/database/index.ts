import mongoose from 'mongoose';
import { DATABASE_URI } from '../config';

export const connectDb = async () => {

    const conn = await mongoose.connect(`${DATABASE_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};
