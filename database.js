const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./avaliacoes.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS avaliacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      comentario TEXT NOT NULL,
      nota INTEGER NOT NULL
    )
  `);
});

module.exports = db;
