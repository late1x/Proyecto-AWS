import { Router } from "express";
import departmentService from "../services/departmentService.js";

const routerDepartment = Router();

/**
 * @swagger
 * /department:
 *   get:
 *     summary: Obtiene una lista de departamentos
 *     tags:
 *       - Department
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numeroDepartamento:
 *                     type: number
 *                   nombre:
 *                     type: string
 *                   area:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                   encargado:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 */
routerDepartment.get("/", async (req, res) => {
  try {
    const departments = await departmentService.getDepartments();
    res.json(departments);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /department/{id}:
 *   get:
 *     summary: Obtiene un departamento por ID
 *     tags:
 *       - Department
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 numeroDepartamento:
 *                   type: number
 *                 nombre:
 *                   type: string
 *                 area:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                 encargado:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 */
routerDepartment.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await departmentService.getDepartmentById(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /department:
 *   post:
 *     summary: Crear nuevo departamento
 *     tags:
 *       - Department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               encargado:
 *                 type: string
 *               area:
 *                 type: string
 *     responses:
 *       201:
 *         description: Departamento creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numeroDepartamento:
 *                   type: number
 *                 nombre:
 *                   type: string
 *                 encargado:
 *                   type: string
 *                 area:
 *                   type: string
 */
routerDepartment.post("/", async (req, res) => {
  try {
    const data = req.body; // Recibe los datos del cuerpo de la solicitud
    const department = await departmentService.addDepartment(data); // Llama al servicio para crear el departamento
    res.status(201).json(department); // Responde con el departamento creado
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message }); // Maneja errores si ocurren
  }
});


/**
 * @swagger
 * /department/{id}:
 *   patch:
 *     summary: Actualiza un departamento por ID
 *     tags:
 *       - Department
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               area:
 *                 type: string
 *               encargado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Departamento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 area:
 *                   type: string
 *                 encargado:
 *                   type: string
 */
routerDepartment.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body; // Aquí tomamos el cuerpo de la solicitud para actualizar el departamento
    const department = await departmentService.updateDepartment(id, data); // Se actualiza el departamento en la base de datos
    res.status(200).json(department); // Se responde con el departamento actualizado
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message }); // Manejo de errores
  }
});


/**
 * @swagger
 * /department/{id}:
 *   delete:
 *     summary: Eliminar un departamento por ID
 *     tags:
 *       - Department
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Departamento eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Departamento eliminado"
 */
routerDepartment.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await departmentService.deleteDepartment(id);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

export default routerDepartment;

