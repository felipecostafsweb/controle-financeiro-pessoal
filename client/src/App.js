import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Summary from './components/Summary';
import Transactions from './components/Transactions';
import * as api from './api/api';
import DateForm from './components/DateForm';
import Button from './components/Button';

const getCurrentPeriod = () => {
  const year = new Date().getFullYear().toString();
  const monthInt = new Date().getMonth() + 1;

  if (monthInt < 12) {
    return `${year.toString()}-0${monthInt.toString()}`;
  } else {
    return `${year.toString()}-${monthInt.toString()}`;
  }
}; //Done

export default function App() {
  const [selectedPeriod, setSelectedPeriod] = useState(getCurrentPeriod);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [allPeriods, setAllPeriods] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const transactions = await api.fetchTransactions(selectedPeriod);

      setSelectedTransactions(transactions);
      setFilteredTransactions(transactions);
    };
    fetch();
  }, [selectedPeriod]); //Done

  useEffect(() => {
    const fetch = async () => {
      const transactions = await api.fetchAll();
      let periods = new Set();
      let id = 0;

      transactions.forEach((transaction) => {
        if (transaction.yearMonth !== undefined) {
          periods.add(transaction.yearMonth);
        }
      });

      const periodsArray = Array.from(periods);
      periodsArray.sort();

      const periodsWithName = periodsArray.map((period) => {
        const split = period.split('-');

        return {
          id: id++,
          period,
          periodName: `${api.nameOf(split[1])}/${split[0]}`,
        };
      });

      setAllPeriods(periodsWithName);
    };
    fetch();
  }, []); //Done

  useEffect(() => {
    const newTransactions = selectedTransactions.filter((transaction) => {
      return transaction.description
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
    setFilteredTransactions(newTransactions);
  }, [filter]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  }; //Done

  const handleButtonClick = (target) => {
    console.log(target);
  };

  const handleButtonClickModal = (target) => {
    console.log(target);
  };

  const handleOnFilterChange = (filterText) => {
    setFilter(filterText);
  }; //Done

  return (
    <div className="container">
      <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Bootcamp Full Stack - Desafio Final
      </h4>
      <span style={styles.subTittle}>Controle Financeiro Pessoal</span>
      <div style={styles.container}>
        <Button
          style={styles.btn}
          className="waves-effect waves-light btn"
          type="icon"
          onClick={handleButtonClick}
        >
          keyboard_arrow_left
        </Button>

        <DateForm
          currentPeriod={getCurrentPeriod()}
          periodsAndNames={allPeriods}
          onSelect={handlePeriodChange}
        />

        <Button
          style={styles.btn}
          className="waves-effect waves-light btn"
          type="icon"
          onClick={handleButtonClick}
        >
          keyboard_arrow_right
        </Button>
      </div>
      <div style={styles.summaryStyle}>
        <Summary transactions={filteredTransactions} />
      </div>
      <div style={styles.container2}>
        <Button
          style={styles.btn}
          className="waves-effect waves-light btn"
          onClick={handleButtonClick}
        >
          + NOVO LANÇAMENTO
        </Button>

        <Filter value={filter} onFilterChange={handleOnFilterChange} />
      </div>
      <Transactions
        onBtnClick={handleButtonClick}
        transactions={filteredTransactions}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  container2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subTittle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10px',
    fontSize: '1.5rem',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
    marginLeft: '10px',
    padding: '5px',
  },
  summaryStyle: {
    marginBottom: '10px',
  },
};
