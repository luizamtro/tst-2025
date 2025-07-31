const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();
const db = require('./database');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

app.get('/sobre', (req, res) => {
  res.render('sobre', { title: 'Sobre' });
});

app.get('/contato', (req, res) => {
  res.render('contato', { title: 'Contato' });
});

// Teste de bd
app.get('/test-db', (req, res) => {
  db.get('SELECT COUNT(*) AS total FROM avaliacoes', [], (err, row) => {
    if (err) {
      return res.status(500).send('Erro ao acessar o banco de dados.');
    }
    res.send(`Banco OK. Total de avaliações: ${row.total}`);
  });
});

// Rotas principais dos destinos
app.get('/jericoacoara', (req, res) => {
  res.render('destinos/jericoacoara', { title: 'Jericoacoara' });
});

app.get('/3praias', (req, res) => {
  db.all('SELECT * FROM avaliacoes ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).send('Erro no banco de dados.');
    res.render('destinos/3praias', { title: '3 Praias', avaliacoes: rows });
  });
});

app.get('/out', (req, res) => {
  res.render('destinos/out', { title: 'Out' });
});

app.post('/3praias/avaliar', (req, res) => {
  const { comentario, nota } = req.body;
  if (!comentario || !nota) return res.status(400).send('Dados inválidos.');

  db.run('INSERT INTO avaliacoes (comentario, nota) VALUES (?, ?)', [comentario, nota], (err) => {
    if (err) return res.status(500).send('Erro ao salvar no banco.');
    res.redirect('/3praias');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

module.exports = app;
