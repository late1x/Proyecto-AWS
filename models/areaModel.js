import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  edificio: { type: String, required: true },
}
);

const Area = mongoose.model('Area', areaSchema);

export default Area;

