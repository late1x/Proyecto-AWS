import { Router } from "express";
import supervisorService from "../services/supervisorService.js";

const routerSupervisor = Router();

/**
 * @swagger
 * /supervisor:
 *   get:
 *     summary: Obtiene una lista de supervisores
 *     tags:
 *       - Supervisor
 *     responses:
 *       200:
 *         description: Lista de supervisores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   estudio:
 *                     type: string
 *                   turno:
 *                     type: string
 */
routerSupervisor.get("/", async (req, res) => {
  try {
    const supervisors = await supervisorService.getSupervisors();
    res.json(supervisors);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /supervisor/{id}:
 *   get:
 *     summary: Obtiene un supervisor por ID
 *     tags:
 *       - Supervisor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del supervisor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Supervisor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 estudio:
 *                   type: string
 *                 turno:
 *                   type: string
 */
routerSupervisor.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const supervisor = await supervisorService.getSupervisorById(id);
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor no encontrado" });
    }
    res.json(supervisor);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /supervisor:
 *   post:
 *     summary: Crear un nuevo supervisor
 *     tags:
 *       - Supervisor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del supervisor
 *               estudio:
 *                 type: string
 *                 description: Área de estudio o formación del supervisor
 *               turno:
 *                 type: string
 *                 description: Turno en el que el supervisor trabaja (Ej. Mañana, Tarde, Noche)
 *     responses:
 *       201:
 *         description: Supervisor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   description: Nombre del supervisor
 *                 estudio:
 *                   type: string
 *                   description: Área de estudio o formación del supervisor
 *                 turno:
 *                   type: string
 *                   description: Turno en el que el supervisor trabaja
 *                 _id:
 *                   type: string
 *                   description: ID único asignado al supervisor
 */
routerSupervisor.post("/", async (req, res) => {
  try {
    const data = req.body;
    const supervisor = await supervisorService.addSupervisor(data);
    res.status(201).json(supervisor);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /supervisor/{id}:
 *   patch:
 *     summary: Actualiza un supervisor por su ID
 *     tags:
 *       - Supervisor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del supervisor a actualizar
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
 *                 description: Nuevo nombre del supervisor
 *               estudio:
 *                 type: string
 *                 description: Nueva área de estudio o formación del supervisor
 *               turno:
 *                 type: string
 *                 description: Nuevo turno en el que trabaja el supervisor (Ej. Mañana, Tarde, Noche)
 *     responses:
 *       200:
 *         description: Supervisor actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único del supervisor actualizado
 *                 nombre:
 *                   type: string
 *                   description: Nombre del supervisor actualizado
 *                 estudio:
 *                   type: string
 *                   description: Área de estudio o formación del supervisor actualizado
 *                 turno:
 *                   type: string
 *                   description: Turno del supervisor actualizado
 */
routerSupervisor.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const supervisor = await supervisorService.updateSupervisor(id, data);
    res.status(200).json(supervisor);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /supervisor/{id}:
 *   delete:
 *     summary: Eliminar un supervisor por ID
 *     tags:
 *       - Supervisor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del supervisor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Supervisor eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Supervisor eliminado"
 */
routerSupervisor.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await supervisorService.deleteSupervisor(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

export default routerSupervisor;

