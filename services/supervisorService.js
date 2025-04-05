import Supervisor from "../models/supervisorModel.js";
import Department from "../models/departmentModel.js";

class SupervisorService {
  async getSupervisors() {
    try {
      return await Supervisor.find();
    } catch (error) {
      throw { status: 500, message: "Error al obtener los supervisores" };
    }
  }

  async getSupervisorById(id) {
    try {
      return await Supervisor.findById(id);
    } catch (error) {
      throw { status: 404, message: "Supervisor no encontrado" };
    }
  }

  async addSupervisor(data) {
    if (!data.nombre || !data.estudio || !data.turno) {
      throw { status: 400, message: "Todos los campos son obligatorios" };
    }

    const supervisorExistente = await Supervisor.findOne({ nombre: data.nombre });
    if (supervisorExistente) {
      throw { status: 409, message: "El supervisor ya existe" };
    }

    const nuevoSupervisor = new Supervisor({
      nombre: data.nombre,
      estudio: data.estudio,
      turno: data.turno,
    });

    try {
      await nuevoSupervisor.save();
      return nuevoSupervisor;
    } catch (error) {
      throw { status: 500, message: "Error al crear el supervisor" };
    }
  }

  async updateSupervisor(id, data) {
    try {
      const supervisor = await Supervisor.findById(id);
      if (!supervisor) {
        throw { status: 404, message: "Supervisor no encontrado" };
      }

      if (data.nombre) {
        const supervisorExistente = await Supervisor.findOne({ nombre: data.nombre });
        if (supervisorExistente) {
          throw { status: 409, message: "El supervisor ya existe" };
        }

        // Actualizar los departamentos que tengan este supervisor asignado
        await Department.updateMany(
          { supervisor: supervisor._id },
          { $set: { supervisor: supervisor._id } }
        );
      }

      // Actualizar los datos del supervisor
      Object.assign(supervisor, data);
      await supervisor.save();
      return supervisor;
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al actualizar el supervisor" };
    }
  }

  async deleteSupervisor(id) {
    try {
      const supervisor = await Supervisor.findById(id);
      if (!supervisor) {
        throw { status: 404, message: "Supervisor no encontrado" };
      }

      // Verificar si el supervisor está asignado a algún departamento
      const departamentos = await Department.find({ encargado: supervisor._id });
      if (departamentos.length > 0) {
        throw { status: 400, message: "No se puede eliminar un supervisor con departamentos asignados" };
      }

      // Si no hay departamentos asignados, eliminamos el supervisor
      await supervisor.deleteOne();
      return { message: "Supervisor eliminado exitosamente" };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al eliminar el supervisor" };
    }
  }
}

export default new SupervisorService();
