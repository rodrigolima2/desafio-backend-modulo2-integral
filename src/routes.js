const express = require('express');
const { listarContas } = require('./controllers/listarContas');
const { criarConta } = require('./controllers/criarConta');
const { atualizarUsuarioConta } = require('./controllers/atualizarUsuario');
const { excluirConta } = require('./controllers/excluirConta');
const { depositar } = require('./controllers/depositar');
const { sacar } = require('./controllers/sacar');
const { transferir } = require('./controllers/transferir');
const { saldo } = require('./controllers/saldo');
const { extrato } = require('./controllers/extrato');

const routes = express();

routes.get('/contas', listarContas);
routes.get('/contas/saldo', saldo);
routes.get('/contas/extrato', extrato);
routes.put('/contas/:numeroConta/usuario', atualizarUsuarioConta);
routes.post('/contas', criarConta);
routes.post('/transacoes/depositar', depositar);
routes.post('/transacoes/sacar', sacar);
routes.post('/transacoes/transferir', transferir);
routes.delete('/contas/:numeroConta', excluirConta);

module.exports = routes;