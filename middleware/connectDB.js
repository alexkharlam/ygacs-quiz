import mongoose from 'mongoose';

const connectDB = async () => {
  const DB = process.env.DB.replace(
    '<USER:PASSWORD>',
    `${process.env.DB_USER}:${process.env.DB_PASSWORD}`
  );
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(DB);
    console.log('📂 DB connected successfully');
  } catch (err) {
    console.log('📂❌ Error connecting to the database, shutting down...');
    process.exit(1);
  }
};

export default connectDB;
