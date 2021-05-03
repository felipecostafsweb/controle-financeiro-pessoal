const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const TRANSACTION = require('../models/TransactionModel');

const getTransactions = async (req, res) => {
  const period = req.query.period;

  try {
    const transactions = await TRANSACTION.find({
      yearMonth: period,
    });
    res.send(transactions);
  } catch (error) {
    res
      .status(500)
      .send(
        'Erro: É necessário informar o parâmetro --period--, cujo valor deve estar no formato yyyy-mm'
      );
  }
};

const getAll = async (req, res) => {
  try {
    const transactions = await TRANSACTION.find({}, { _id: 0, yearMonth: 1 });
    res.send(transactions);
  } catch (error) {
    res.status(500).send('Erro ao carregar informações');
  }
};

const removeTransaction = async (req, res) => {
  const id = req.query.id;

  try {
    await TRANSACTION.findByIdAndRemove({ _id: id });
    res.send('Transação deletada');
  } catch (error) {
    res.status(500).send('Erro ao remover transação' + error);
  }
};

const editTransaction = async (req, res) => {
  const id = req.query.id;
  const { description, value, category, yearMonthDay } = req.body;

  try {
    const transactionToEdit = await TRANSACTION.findById(id);

    splittedDate = splitDate(yearMonthDay);

    transactionToEdit.description = description;
    transactionToEdit.value = value;
    transactionToEdit.category = category;
    transactionToEdit.yearMonthDay = yearMonthDay;

    transactionToEdit.year = splittedDate.year;
    transactionToEdit.month = splittedDate.month;
    transactionToEdit.day = splittedDate.day;
    transactionToEdit.yearMonth = splittedDate.yearMonth;

    await transactionToEdit.save();
    res.send('Edição realizada');
  } catch (error) {
    res.status(500).send('Erro ao editar transação' + error);
  }
};

const newTransaction = async (req, res) => {
  try {
    let { description, value, category, yearMonthDay, type } = req.body;

    let { year, month, day, yearMonth } = splitDate(yearMonthDay);

    let response = {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    };

    response = new TRANSACTION(response);

    await response.save();

    res.send('Inclusão realizada');
  } catch (error) {
    res.status(500).send('Erro ao inserir transação' + error);
  }
};

const splitDate = (date) => {
  const values = date.split('-');
  const split = {
    day: parseInt(values[2]),
    month: parseInt(values[1]),
    year: parseInt(values[0]),
    yearMonth: `${values[0]}-${values[1]}`,
  };

  return split;
};

module.exports = {
  getTransactions,
  getAll,
  removeTransaction,
  editTransaction,
  newTransaction,
};
