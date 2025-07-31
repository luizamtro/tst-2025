const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware express-ejs-layouts
app.use(expressLayouts);

// Define o layout padrão
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

// Rotas principais dos destinos
app.get('/jericoacoara', (req, res) => {
  res.render('destinos/jericoacoara', { title: 'Jericoacoara' });
});

app.get('/3praias', (req, res) => {
  res.render('destinos/3praias', { title: '3 Praias' });
});

app.get('/out', (req, res) => {
  res.render('destinos/out', { title: 'Out' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

module.exports = app;
