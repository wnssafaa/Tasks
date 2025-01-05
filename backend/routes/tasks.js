const express = require('express');
const router = express.Router();

let tasks = []; // Tableau temporaire pour stocker les tâches

// Récupérer toutes les tâches
router.get('/', (req, res) => {
  res.json(tasks);
});

// Ajouter une nouvelle tâche
router.post('/', (req, res) => {
  const task = { id: Date.now(), ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

// Modifier une tâche existante
router.put('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).send('Tâche non trouvée.');
  }
});

// Supprimer une tâche
router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.status(204).send();
});

module.exports = router;
