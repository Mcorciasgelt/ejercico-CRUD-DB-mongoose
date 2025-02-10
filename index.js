/* const express = require("express");
const { dbConnection } = require("./config/config");

const app = express();
const PORT = 8080;

const routes = require('./routes');

app.use(express.json());

app.use('/', routes);

dbConnection();

app.use(express.json());

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`)); */

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const tasksRoutes = require("./routes/tasks"); // Importamos las rutas

dotenv.config();
const app = express();
const PORT = 8080;

app.use(express.json()); // Permitir JSON en el body
app.use("/", tasksRoutes); // Usamos las rutas de tareas

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));