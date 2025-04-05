import { Router } from "express";
import employeeService from "../services/employeeService.js";

const routerEmployee = Router();

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Obtiene una lista de empleados
 *     tags:
 *       - Employee
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numeroEmpleado:
 *                     type: number
 *                   nombre:
 *                     type: string
 *                   apellido:
 *                     type: string
 *                   edad:
 *                     type: number
 *                   genero:
 *                     type: string
 *                   departamentos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                         numeroDepartamento:
 *                           type: number
 */
routerEmployee.get("/", async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();
    res.json(employees);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /employee/{id}:
 *   get:
 *     summary: Obtiene un empleado por ID
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 numeroEmpleado:
 *                   type: number
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 edad:
 *                   type: number
 *                 genero:
 *                   type: string
 *                 departamentos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                       numeroDepartamento:
 *                         type: number
 */
routerEmployee.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Crear nuevo empleado
 *     tags:
 *       - Employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroEmpleado:
 *                 type: number
 *                 description: El número único del empleado
 *               nombre:
 *                 type: string
 *                 description: Nombre del empleado
 *               apellido:
 *                 type: string
 *                 description: Apellido del empleado
 *               edad:
 *                 type: number
 *                 description: Edad del empleado
 *               genero:
 *                 type: string
 *                 description: Género del empleado
 *               departamentos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ID de un departamento al que pertenece el empleado
 *                 description: Lista de departamentos (por ID) en los que trabaja el empleado
 *     responses:
 *       201:
 *         description: Empleado creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numeroEmpleado:
 *                   type: number
 *                   description: El número único del empleado
 *                 nombre:
 *                   type: string
 *                   description: Nombre del empleado
 *                 apellido:
 *                   type: string
 *                   description: Apellido del empleado
 *                 edad:
 *                   type: number
 *                   description: Edad del empleado
 *                 genero:
 *                   type: string
 *                   description: Género del empleado
 *                 departamentos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: ID del departamento al que pertenece el empleado
 *                   description: Lista de departamentos (por ID) a los que el empleado pertenece
 */
routerEmployee.post("/", async (req, res) => {
  try {
    const data = req.body;
    const employee = await employeeService.addEmployee(data);
    res.status(201).json(employee);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /employee/{id}:
 *   patch:
 *     summary: Actualiza un empleado por ID
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroEmpleado:
 *                 type: number
 *                 description: El número único del empleado
 *               nombre:
 *                 type: string
 *                 description: Nombre del empleado
 *               apellido:
 *                 type: string
 *                 description: Apellido del empleado
 *               edad:
 *                 type: number
 *                 description: Edad del empleado
 *               genero:
 *                 type: string
 *                 description: Género del empleado
 *               departamentos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ID del departamento al que pertenece el empleado
 *                 description: Lista de departamentos (por ID) en los que el empleado trabaja
 *     responses:
 *       200:
 *         description: Empleado actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del empleado actualizado
 *                 numeroEmpleado:
 *                   type: number
 *                   description: El número único del empleado
 *                 nombre:
 *                   type: string
 *                   description: Nombre del empleado
 *                 apellido:
 *                   type: string
 *                   description: Apellido del empleado
 *                 edad:
 *                   type: number
 *                   description: Edad del empleado
 *                 genero:
 *                   type: string
 *                   description: Género del empleado
 *                 departamentos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: ID del departamento al que pertenece el empleado
 *                   description: Lista de departamentos (por ID) a los que el empleado pertenece
 */
routerEmployee.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const employee = await employeeService.updateEmployee(id, data);
    res.json(employee);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Eliminar un empleado por ID
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empleado eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleado eliminado"
 */
routerEmployee.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await employeeService.deleteEmployee(id);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

export default routerEmployee;
