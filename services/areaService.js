import Area from "../models/areaModel.js";
import Department from "../models/departmentModel.js";

class AreaService {
  async getAreas() {
    try {
      return await Area.find();
    } catch (error) {
      throw { status: 500, message: "Error al obtener las áreas" };
    }
  }

  async getAreaById(id) {
    try {
      const area = await Area.findById(id);
      return area;
    } catch (error) {
      throw { status: 404, message: "Área no encontrada" };
    }
  }

  async addArea(data) {
    if (!data.nombre || !data.edificio) {
      throw { status: 400, message: "Todos los campos son obligatorios" };
    }

    const areaExistente = await Area.findOne({ nombre: data.nombre });
    if (areaExistente) {
      throw { status: 409, message: "Área ya existe" };
    }

    const nuevaArea = new Area({
      nombre: data.nombre,
      edificio: data.edificio,
    });

    try {
      await nuevaArea.save();
      return nuevaArea;
    } catch (error) {
      throw { status: 500, message: "Error al crear la área" };
    }
  }

  async updateArea(id, data) {
    try {
      // Buscar el área que se desea actualizar
      const area = await Area.findById(id);
      if (!area) {
        throw { status: 404, message: "Área no encontrada" };
      }

      // Verificar si se está intentando cambiar el nombre del área
      if (data.nombre) {
        // Validar si ya existe otra área con el mismo nombre
        const areaExistente = await Area.findOne({ nombre: data.nombre });
        if (areaExistente) {
          throw { status: 409, message: "El nombre del área ya está en uso" };
        }

        // Verificar si hay departamentos asociados con el área
        const departamentosConArea = await Department.find({ area: area._id });

        if (departamentosConArea.length > 0) {
          // Si existen departamentos, actualizamos la referencia al ObjectId de la nueva área
          await Department.updateMany(
            { area: area._id },
            { $set: { area: area._id } }
          );
        } else {
          // Si no existen departamentos, simplemente actualizamos el área sin afectar nada
          console.log('No hay departamentos asociados, solo actualizando el área');
        }
      }

      // Actualizar la información del área
      Object.assign(area, data);
      await area.save();

      return area;
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al actualizar el área" };
    }
  }

  async deleteArea(id) {
    try {
      const area = await Area.findById(id);
      if (!area) {
        throw { status: 404, message: "Área no encontrada" };
      }

      // Verificar si el área está asignada a algún departamento
      const departamentos = await Department.find({ area: area._id });
      if (departamentos.length > 0) {
        throw { status: 400, message: "No se puede eliminar un área con departamentos asignados" };
      }

      await area.deleteOne();
      return { message: "Área eliminada exitosamente" };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al eliminar el área" };
    }
  }
}

export default new AreaService();
