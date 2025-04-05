import Employee from "../models/employeeModel.js";
import Department from "../models/departmentModel.js";

class EmployeeService {
  async getEmployees() {
    try {
      return await Employee.find().populate("departamentos");
    } catch (error) {
      throw { status: 500, message: "Error al obtener los empleados" };
    }
  }

  async getEmployeeById(id) {
    try {
      return await Employee.findById(id).populate("departamentos");
    } catch (error) {
      throw { status: 404, message: "Empleado no encontrado" };
    }
  }

  async addEmployee(data) {
    if (!data.numeroEmpleado || !data.nombre || !data.apellido || !data.edad || !data.genero || !data.departamentos) {
      throw { status: 400, message: "Todos los campos son obligatorios" };
    }

    if (data.departamentos.length !== 3) {
      throw { status: 400, message: "El empleado debe estar vinculado a exactamente tres departamentos" };
    }

    // Validar que los departamentos existen
    const departamentosExistentes = await Department.find({
      '_id': { $in: data.departamentos }
    });

    if (departamentosExistentes.length !== 3) {
      throw { status: 404, message: "Uno o más departamentos no existen" };
    }

    // Crear el nuevo empleado
    const nuevoEmpleado = new Employee({
      numeroEmpleado: data.numeroEmpleado,
      nombre: data.nombre,
      apellido: data.apellido,
      edad: data.edad,
      genero: data.genero,
      departamentos: data.departamentos
    });

    try {
      await nuevoEmpleado.save();
      return nuevoEmpleado;
    } catch (error) {
      throw { status: 500, message: "Error al crear el empleado" };
    }
  }

  async updateEmployee(id, data) {
    const empleado = await Employee.findById(id);
    if (!empleado) {
      throw { status: 404, message: "Empleado no encontrado" };
    }

    // Validar que los departamentos existen
    if (data.departamentos && data.departamentos.length !== 3) {
      throw { status: 400, message: "El empleado debe estar vinculado a exactamente tres departamentos" };
    }

    if (data.departamentos) {
      const departamentosExistentes = await Department.find({
        '_id': { $in: data.departamentos }
      });

      if (departamentosExistentes.length !== 3) {
        throw { status: 404, message: "Uno o más departamentos no existen" };
      }
    }

    Object.assign(empleado, data);
    await empleado.save();

    return empleado;
  }

  async deleteEmployee(id) {
    try {
      const employee = await Employee.findByIdAndDelete(id);

      if (!employee) {
        throw { status: 404, message: "Empleado no encontrado" };
      }

      return { message: "Empleado eliminado exitosamente" };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al eliminar el empleado" };
    }
  }
}

export default new EmployeeService();

