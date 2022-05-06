const express = require('express');
const multasController = require('./controllers/MultasController')
const routes = express.Router();


routes.get('/Lista', multasController.buscaMultas);
routes.post('/AlteraStatus', multasController.alterarEstatus);

module.exports = routes;
