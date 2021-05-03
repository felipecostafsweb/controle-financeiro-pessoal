import * as api from '../api/api';

const fetchTransactions = async () => {
  const transactions = await api.fetchAll();
  let periods = new Set();

  transactions.forEach((transaction) => {
    periods.add(transaction);
  });
  return dateSet;
};

export { fetchTransactions };
