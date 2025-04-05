import mongoose from 'mongoose';

async function connectDB() {
  try {
    await mongoose.connect('mongodb://root:net39UrPKfPCnfqj5dmdpX89J6D5urNr9gb2Qvlk2ifEfctJMhhUXnnDnJYDoUco@189.253.12.72:27018', {
      directConnection: true,
    });
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
  }
}

export default connectDB;

