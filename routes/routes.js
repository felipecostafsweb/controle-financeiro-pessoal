const express = require('express');
const transactionRouter = express.Router();
const services = require('../services/transactionService.js');

transactionRouter.get('/', services.getTransactions);
transactionRouter.get('/all', services.getAll);
transactionRouter.delete('/remove', services.removeTransaction);
transactionRouter.patch('/edit', services.editTransaction);
transactionRouter.post('/new', services.newTransaction);

module.exports = transactionRouter;
