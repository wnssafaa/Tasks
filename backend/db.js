const sqlite3 = require('sqlite3').verbose();

// Crée ou ouvre une base de données SQLite (task.db)
const db = new sqlite3.Database('./tasks.db', (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données SQLite:', err.message);
  } else {
    console.log('Base de données SQLite connectée.');
  }
});

// Créer la table 'tasks' si elle n'existe pas déjà
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'À faire',
      priority TEXT DEFAULT 'Moyenne',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      due_date DATETIME,
      updated_at DATETIME,
      estimated_time INTEGER,
      category TEXT,
      assigned_to TEXT,
      tags TEXT,
      comments TEXT,
       start_date DATETIME, -- Nouvelle colonne pour la date de début
    end_date DATETIME    -- Nouvelle colonne pour la date de fin;
    )
  `);
});

module.exports = db; // Exporter la connexion pour l'utiliser dans 'server.js'
