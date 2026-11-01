import mongoose from 'mongoose';
import { MONGODB_URI } from './utils.js';

export default async function connectDB() {
  // The application frontend can run in preview mode without a database.
  // Configure MONGODB_URI when database-backed API features are needed.
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not set; starting API without database features.');
    return false;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');
    return true;
  } catch (err) {
    console.error('MongoDB connection failed:', err?.message || err);
    console.warn('API server will remain available, but database-backed routes will not work until MongoDB is configured.');
    return false;
  }
}
