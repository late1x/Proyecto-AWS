import mongoose from 'mongoose';

const supervisorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estudio: { type: String, required: true },
  turno: { type: String, required: true },
});

const Supervisor = mongoose.model('Supervisor', supervisorSchema);

export default Supervisor;
