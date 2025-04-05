import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  numeroEmpleado: { type: Number, required: true, unique: true, min: 1 },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true, trim: true },
  edad: { type: Number, required: true },
  genero: {
    type: String,
    required: true,
    enum: ['Masculino', 'Femenino', 'masculino', 'femenino', 'Otro']
  },
  departamentos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    }
  ],
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;

