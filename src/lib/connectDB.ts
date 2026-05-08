import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error('MONGO_URI environment variable is not defined');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoURI).then((mongoose) => {
      return mongoose.connection;
    });
  }
  try {
    const conn = await cached.promise;
    return conn;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
