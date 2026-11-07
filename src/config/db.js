const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('Falta la variable de entorno MONGO_URI');
  }
  await mongoose.connect(uri);
  console.log('MongoDB conectado');
};

module.exports = connectDB;
