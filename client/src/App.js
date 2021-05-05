import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Summary from './components/Summary';
import Transactions from './components/Transactions';
import * as api from './api/api';
import Button from './components/Button';
import DateContainer from './components/DateContainer';
import { getCurrentPeriod } from './helpers/formatHelpers';

export default function App() {
  const [selectedPeriod, setSelectedPeriod] = useState(getCurrentPeriod());
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [allPeriods, setAllPeriods] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState(null);

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
      let initialId = 0;

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
      periodsWithName.forEach((period) => {
        if (period.period === getCurrentPeriod()) {
          initialId = period.id;
        }
      });
      setSelectedPeriodId(initialId);
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
  }, [filter]); //Done

  const handlePeriodChange = (periodId) => {
    setSelectedPeriodId(parseInt(periodId));
    setSelectedPeriod(allPeriods[periodId].period);
  }; //Done

  const handleButtonClick = (target) => {
    console.log(target);
  };

  const handlePeriodChangeByClick = (target) => {
    //Manipulação do período através de butões
    if (target === 'keyboard_arrow_right') {
      //Condição para impedir Overflow
      if (selectedPeriodId + 1 === allPeriods.length) {
        setSelectedPeriod(allPeriods[selectedPeriodId].period);
        setSelectedPeriodId(selectedPeriodId);
      } else {
        setSelectedPeriod(allPeriods[selectedPeriodId + 1].period);
        setSelectedPeriodId(selectedPeriodId + 1);
      }
    } else {
      //Condição para impedir Overflow
      if (selectedPeriodId - 1 < 0) {
        setSelectedPeriod(allPeriods[selectedPeriodId].period);
        setSelectedPeriodId(selectedPeriodId);
      } else {
        setSelectedPeriod(allPeriods[selectedPeriodId - 1].period);
        setSelectedPeriodId(selectedPeriodId - 1);
      }
    }
  }; //Done

  const handleButtonClickModal = (target) => {
    console.log(target);
  };

  const handleOnFilterChange = (filterText) => {
    setFilter(filterText);
  }; //Done

  return (
    <div className="container">
      <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Controle Financeiro Pessoal
      </h4>

      <DateContainer
        currentId={selectedPeriodId}
        allPeriods={allPeriods}
        handlePeriodChangeTop={handlePeriodChange}
        handlePeriodChangeByClick={handlePeriodChangeByClick}
      />

      <div style={styles.summaryStyle}>
        <Summary transactions={filteredTransactions} />
      </div>

      <div style={styles.container}>
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
  btn: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
    marginLeft: '10px',
    padding: '5px',
  },
  container: {
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
  summaryStyle: {
    marginBottom: '10px',
  },
};
