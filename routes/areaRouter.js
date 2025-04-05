import { Router } from "express";
import areaService from "../services/areaService.js";

const routerArea = Router();


/**
 * @swagger
 * /area:
 *   get:
 *     summary: Obtiene una lista de áreas
 *     tags:
 *       - Areas
 *     responses:
 *       200:
 *         description: Lista de áreas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   edificio:
 *                     type: string
 */
routerArea.get("/", async (req, res) => {
  try {
    const areas = await areaService.getAreas();
    res.json(areas);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /area/{id}:
 *   get:
 *     summary: Obtiene un área por ID
 *     tags:
 *       - Areas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la área
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 edificio:
 *                   type: string
 */
routerArea.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const area = await areaService.getAreaById(id);
    if (!area) {
      return res.status(404).json({ message: "Área no encontrada" });
    }
    res.json(area);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /area:
 *   post:
 *     summary: Crear nueva área
 *     tags:
 *       - Areas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre de la nueva área
 *               edificio:
 *                 type: string
 *                 description: El nombre del edificio donde se encuentra la nueva área
 *     responses:
 *       201:
 *         description: Área creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   description: El nombre de la nueva área
 *                 edificio:
 *                   type: string
 *                   description: El nombre del edificio
 */
routerArea.post('/', async (req, res) => {
  try {
    const { nombre, edificio } = req.body;
    const data = { nombre, edificio }; // Uso de solo las propiedades necesarias
    const area = await areaService.addArea(data);
    res.status(201).json(area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



/**
 * @swagger
 * /area/{id}:
 *   patch:
 *     summary: Actualiza un área por ID
 *     tags:
 *       - Areas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la área
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
 *               edificio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Área actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 edificio:
 *                   type: string
 */
routerArea.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body; // Esto contiene los datos que el cliente envía para actualizar
    const area = await areaService.updateArea(id, data); // Se pasa al servicio para actualizar el área
    res.json(area); // Se responde con el área actualizada
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message }); // Manejo de errores
  }
});


/**
 * @swagger
 * /area/{id}:
 *   delete:
 *     summary: Eliminar una área por ID
 *     tags:
 *       - Areas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la área
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Área eliminada"
 */
routerArea.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await areaService.deleteArea(id);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

export default routerArea;

