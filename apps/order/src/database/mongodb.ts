import mongoose from 'mongoose';

export const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log('Connected to mongodb');
  } catch (error) {
    console.error('Error connecting to mongodb');
    console.error(error);
  }
};
