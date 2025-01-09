const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Importer la connexion à la base de données SQLite

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Ajouter une tâche
app.post('/tasks', (req, res) => {
  const {
    title,
    description,
    status = 'À faire',
    priority = 'Moyenne',
    due_date = null,
    estimated_time = null,
    category = null,
    assigned_to = null,
    tags = null,
    comments = null,
    start_date = null, // Nouvelle colonne
    end_date = null // Nouvelle colonne
  } = req.body;

  db.run(
    `INSERT INTO tasks (title, description, status, priority, due_date, estimated_time, category, assigned_to, tags, comments, start_date, end_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description, status, priority, due_date, estimated_time, category, assigned_to, tags, comments, start_date, end_date],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({
        id: this.lastID,
        title,
        description,
        status,
        priority,
        due_date,
        estimated_time,
        category,
        assigned_to,
        tags,
        comments,
        start_date,
        end_date
      });
    }
  );
});

// Récupérer toutes les tâches
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Récupérer une tâche par ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Tâche non trouvée' });
      return;
    }
    res.json(row);
  });
});

// Mettre à jour une tâche
app.put('/tasks/:id', (req, res) => {
  const {
    title,
    description,
    status,
    priority,
    due_date,
    estimated_time,
    category,
    assigned_to,
    tags,
    comments,
    start_date,
    end_date
  } = req.body;

  db.run(
    `UPDATE tasks SET
      title = ?,
      description = ?,
      status = ?,
      priority = ?,
      due_date = ?,
      estimated_time = ?,
      category = ?,
      assigned_to = ?,
      tags = ?,
      comments = ?,
      start_date = ?, 
      end_date = ?
    WHERE id = ?`,
    [title, description, status, priority, due_date, estimated_time, category, assigned_to, tags, comments, start_date, end_date, req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes });
    }
  );
});

// Supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
  db.run('DELETE FROM tasks WHERE id = ?', req.params.id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});
app.patch('/tasks/:id/status', (req, res) => {
  const { status } = req.body;
  const taskId = req.params.id;

  db.run(
    `UPDATE tasks SET status = ? WHERE id = ?`,
    [status, taskId],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes });
    }
  );
});
app.patch('/tasks/:id/priority', (req, res) => {
  const { priority } = req.body;
  const taskId = req.params.id;

  db.run(
    `UPDATE tasks SET priority = ? WHERE id = ?`,
    [priority, taskId],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes });
    }
  );
});
let tasks = [/* Exemple de tâches */];  // Liste des tâches (à remplacer par une base de données)

app.post('/tasks/delete-tasks', (req, res) => {
  const { ids } = req.body;
  tasks = tasks.filter(task => !ids.includes(task.id));  // Filtrer les tâches à supprimer
  res.status(200).json({ message: 'Tâches supprimées avec succès' });
});
// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
