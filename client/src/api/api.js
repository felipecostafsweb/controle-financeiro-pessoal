import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/transaction';

const fetchTransactions = async (period) => {
  const REQ_URL = `?period=${period}`;
  const res = await axios.get(`${BASE_URL}${REQ_URL}`);
  return res.data;
};

const fetchAll = async () => {
  const REQ_URL = '/all';
  const res = await axios.get(`${BASE_URL}${REQ_URL}`);
  return res.data;
};

const nameOf = (month) => {
  switch (month) {
    case '01':
      return 'Jan';
    case '02':
      return 'Fev';
    case '03':
      return 'Mar';
    case '04':
      return 'Abr';
    case '05':
      return 'Mai';
    case '06':
      return 'Jun';
    case '07':
      return 'Jul';
    case '08':
      return 'Ago';
    case '09':
      return 'Set';
    case '10':
      return 'Out';
    case '11':
      return 'Nov';
    case '12':
      return 'Dez';
    default:
      return '';
  }
};
export { fetchTransactions, fetchAll, nameOf };
