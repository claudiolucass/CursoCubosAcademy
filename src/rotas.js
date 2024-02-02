const express = require('express');

const { listarContas } = require('./controladores/listagemContasBancarias');
const { criarConta } = require('./controladores/criarContaBancaria');
const { atualizarConta } = require('./controladores/atualizarDadosContaBancaria');
const { excluirConta } = require('./controladores/excluirContaBancaria');
const { depositarConta } = require('./controladores/depositarContaBancaria');
const { sacarConta } = require('./controladores/sacarContaBancaria');
const { transferirConta } = require('./controladores/transferirValores');
const { consultarSaldoConta } = require('./controladores/consultarSaldoConta');
const { extratoConta } = require('./controladores/emitirExtratoBancario');

const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarConta);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.post('/transacoes/depositar', depositarConta);
rotas.post('/transacoes/sacar', sacarConta);
rotas.post('/transacoes/transferir', transferirConta);
rotas.get('/contas/saldo', consultarSaldoConta);
rotas.get('/contas/extrato', extratoConta);

module.exports = rotas;