const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/create", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }

    const newTask = await Task.create({ title });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
});

router.get('/', async (req, res) => {
  try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
  } catch (error) {
      res.status(500).json({ message: "Error obteniendo las tareas", error });
  }
});

router.get('/id/:_id', async (req, res) => {
  try {
      const task = await Task.findById(req.params._id);
      if (!task) {
          return res.status(404).json({ message: "Tarea no encontrada" });
      }
      res.status(200).json(task);
  } catch (error) {
      res.status(500).json({ message: "Error buscando la tarea", error });
  }
});

router.put("/markAsCompleted/:_id", async (req, res) => {
  try {
      const updatedTask = await Task.findByIdAndUpdate(
          req.params._id, 
          { completed: true }, 
          { new: true }
      );

      if (!updatedTask) {
          return res.status(404).json({ message: "Tarea no encontrada" });
      }

      res.json(updatedTask);
  } catch (error) {
      res.status(500).json({ message: "Error en el servidor" });
  }
});

router.put('/id/:_id', async (req, res) => {
  try {
      const { _id } = req.params;
      const { title } = req.body;

      const updatedTask = await Task.findByIdAndUpdate(
          _id, 
          { title },
          { new: true }
      );

      if (!updatedTask) {
          return res.status(404).json({ message: 'Tarea no encontrada' });
      }

      res.status(200).json(updatedTask);
  } catch (error) {
      console.error('Error actualizando la tarea:', error);
      res.status(500).json({ message: 'Hubo un problema actualizando la tarea' });
  }
});

router.delete('/id/:_id', async (req, res) => {
  try {
      const { _id } = req.params;

      const deletedTask = await Task.findByIdAndDelete(_id);

      if (!deletedTask) {
          return res.status(404).json({ message: 'Tarea no encontrada' });
      }

      res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
      console.error('Error eliminando la tarea:', error);
      res.status(500).json({ message: 'Hubo un problema eliminando la tarea' });
  }
});

module.exports = router;