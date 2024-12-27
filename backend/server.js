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
    status = 'À faire',  // Par défaut 'À faire'
    priority = 'Moyenne', // Par défaut 'Moyenne'
    due_date = null, 
    estimated_time = null,
    category = null,
    assigned_to = null,
    tags = null,
    comments = null
  } = req.body;

  db.run(
    `INSERT INTO tasks (title, description, status, priority, due_date, estimated_time, category, assigned_to, tags, comments)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description, status, priority, due_date, estimated_time, category, assigned_to, tags, comments],
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
        comments
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
    comments
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
      comments = ?
    WHERE id = ?`,
    [title, description, status, priority, due_date, estimated_time, category, assigned_to, tags, comments, req.params.id],
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
  db.run(`DELETE FROM tasks WHERE id = ?`, req.params.id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
