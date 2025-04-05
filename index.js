import express from 'express';
import connectDB from './config/db.js';
import { logErrors, errorHandler } from './middleware/errorHandler.js';
import { setupSwagger } from './swagger.js';
import routerApi from "./routes/rutas.js";

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Configuración de rutas
routerApi(app);

// Manejo de errores
app.use(logErrors);
app.use(errorHandler);

// Configuración de Swagger
setupSwagger(app);

const PORT = 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log("My port is working on: " + PORT);
});
