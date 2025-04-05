import Department from "../models/departmentModel.js";
import Area from "../models/areaModel.js";
import Supervisor from "../models/supervisorModel.js";
import Employee from "../models/employeeModel.js";

class DepartmentService {
  async getDepartments() {
    try {
      return await Department.find().populate("area encargado");
    } catch (error) {
      throw { status: 500, message: "Error al obtener los departamentos" };
    }
  }

  async getDepartmentById(id) {
    try {
      return await Department.findById(id).populate("area encargado");
    } catch (error) {
      throw { status: 404, message: "Departamento no encontrado" };
    }
  }

  async addDepartment(data) {
    console.log('Datos recibidos:', data);

    if (!data.nombre || !data.area || !data.encargado) {
      throw { status: 400, message: "Todos los campos son obligatorios" };
    }

    console.log('Buscando área con ID:', data.area);
    const areaExistente = await Area.findById(data.area);
    if (!areaExistente) {
      throw { status: 404, message: `Área con ID ${data.area} no encontrada` };
    }

    console.log('Buscando supervisor con ID:', data.encargado);
    const encargadoExistente = await Supervisor.findById(data.encargado);
    if (!encargadoExistente) {
      throw { status: 404, message: `Supervisor con ID ${data.encargado} no encontrado` };
    }

    // Crear el nuevo departamento
    const nuevoDepartamento = new Department({
      nombre: data.nombre,
      area: areaExistente._id,
      encargado: encargadoExistente._id,
    });

    try {
      console.log('Guardando departamento');
      await nuevoDepartamento.save();
      return nuevoDepartamento;
    } catch (error) {
      console.log('Error al crear el departamento:', error.message);
      throw { status: 500, message: `Error al crear el departamento: ${error.message}` };
    }
  }

  async updateDepartment(id, data) {
    try {
      // Buscar el departamento por ID
      const departamento = await Department.findById(id);
      if (!departamento) {
        throw { status: 404, message: "Departamento no encontrado" };
      }

      // Validar si se intenta actualizar el nombre
      if (data.nombre) {
        const departamentoExistente = await Department.findOne({ nombre: data.nombre });
        if (departamentoExistente && departamentoExistente._id.toString() !== id) {
          throw { status: 409, message: "El nombre del departamento ya existe" };
        }
      }

      // Validar si se intenta actualizar el área
      if (data.area) {
        const areaExistente = await Area.findById(data.area);
        if (!areaExistente) {
          throw { status: 404, message: "Área no encontrada" };
        }
      }

      // Validar si se intenta actualizar el encargado
      if (data.encargado) {
        const supervisorExistente = await Supervisor.findById(data.encargado);
        if (!supervisorExistente) {
          throw { status: 404, message: "Encargado (Supervisor) no encontrado" };
        }
      }

      // Actualizar los datos del departamento
      Object.assign(departamento, data);
      await departamento.save();

      // Si se cambia el nombre del departamento, actualizar en los empleados asignados
      if (data.nombre) {
        const empleadosAsignados = await Employee.find({ "departamentos": departamento._id });
        if (empleadosAsignados.length > 0) {
          await Employee.updateMany(
            { "departamentos": departamento._id },
            { $set: { "departamentos.$[elem].nombre": data.nombre } },
            { arrayFilters: [{ "elem._id": departamento._id }] }
          );
        }
      }

      return departamento;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error al actualizar el departamento"
      };
    }
  }



  async deleteDepartment(id) {
    try {
      const departamento = await Department.findById(id);
      if (!departamento) {
        throw { status: 404, message: "Departamento no encontrado" };
      }

      // Verificar si hay empleados asignados a este departamento
      const empleadosAsignados = await Employee.find({ "departamentos": departamento._id });
      if (empleadosAsignados.length > 0) {
        throw { status: 400, message: "El departamento tiene empleados asignados" };
      }

      await departamento.deleteOne();
      return { message: "Departamento eliminado exitosamente" };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al eliminar el departamento" };
    }
  }
}

export default new DepartmentService();

