import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence'; // Asegúrate de requerir mongoose como argumento

// Crear el esquema para el departamento
const departmentSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  numeroDepartamento: { type: Number, unique: true },
  area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true },
  encargado: { type: mongoose.Schema.Types.ObjectId, ref: 'Supervisor' },
});

// Usa el plugin de secuencia para autoincrementar el campo `numeroDepartamento`
departmentSchema.plugin(mongooseSequence(mongoose), { inc_field: 'numeroDepartamento' });

// Crear y exportar el modelo
const Department = mongoose.model('Department', departmentSchema);

export default Department;



