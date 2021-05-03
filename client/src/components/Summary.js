import React from 'react';
import { formatNumber } from '../helpers/formatHelpers';
import Info from './Info';

export default function Summary({ transactions }) {
  const numOfTransactions = transactions.length;

  const income = transactions.reduce((acc, cur) => {
    if (cur.type === '+') {
      acc += cur.value;
    }
    return acc;
  }, 0);

  const expense = transactions.reduce((acc, cur) => {
    if (cur.type === '-') {
      acc += cur.value;
    }
    return acc;
  }, 0);

  return (
    <div style={styles.container}>
      <div>
        <span style={{ fontWeight: 'bold' }}>Lançamentos: </span>
        {numOfTransactions}
      </div>
      <Info
        color={'green-text accent-1-text'}
        label={'Receitas: '}
        value={income}
      />
      <Info
        color={'red-text accent-1-text'}
        label={'Despesas: '}
        value={expense}
      />
      <Info
        color={`${
          income - expense > 0
            ? 'green-text accent-1-text'
            : 'red-text accent-1-text'
        }`}
        label={'Saldo: '}
        value={income - expense}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid gray',
    borderRadius: '5px',
    padding: '5px',
  },
};
