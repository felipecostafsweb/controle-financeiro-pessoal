import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Summary from './components/Summary';
import Transactions from './components/Transactions';
import * as api from './api/api';
import Button from './components/Button';
import DateContainer from './components/DateContainer';
import { getCurrentPeriod } from './helpers/formatHelpers';
import Modal from 'react-modal';
import NewAndEditModal from './components/NewAndEditModal';

const customStyles = {
  content: {
    width: '400px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export default function App() {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(getCurrentPeriod());
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [allPeriods, setAllPeriods] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const transactions = await api.fetchTransactions(selectedPeriod);

      setSelectedTransactions(transactions);
      setFilteredTransactions(transactions);
      setIsDeleted(false);
    };
    fetch();
  }, [selectedPeriod, isDeleted]); //Done

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

  const handleButtonClick = async (target, id) => {
    if (target === 'delete') {
      await api.deleteTransaction(id);
      setIsDeleted(true);
    } else if (target === 'edit') {
      openModal('edit');
    } else {
      openModal('add');
    }
  }; //Done

  const handlePeriodChangeByClick = (target) => {
    //Manipulação do período através de botões
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

  const handleOnFilterChange = (filterText) => {
    setFilter(filterText);
  }; //Done

  const openModal = (type) => {
    if (type === 'add') {
      setAddModalIsOpen(true);
    } else {
      setEditModalIsOpen(true);
    }
  }; //Done

  const closeModal = () => {
    setEditModalIsOpen(false);
    setAddModalIsOpen(false);
  }; //Done

  return (
    <div>
      <NewAndEditModal
        modalIsOpen={addModalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        enableRadio={false}
      >
        Inclusão de Lançamento
      </NewAndEditModal>
      <NewAndEditModal
        modalIsOpen={editModalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        enableRadio={true}
      >
        Edição de lançamento
      </NewAndEditModal>

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

        <span style={styles.summaryStyle}>
          <Summary transactions={filteredTransactions} />
        </span>

        <div style={styles.container}>
          <Button
            style={styles.btn}
            className="btn"
            onClick={handleButtonClick}
          >
            + Adicionar
          </Button>

          <Filter value={filter} onFilterChange={handleOnFilterChange} />
        </div>

        <Transactions
          onBtnClick={handleButtonClick}
          transactions={filteredTransactions}
        />
      </div>
    </div>
  );
}

const styles = {
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid gray',
    borderRadius: '5px',
    padding: '5px',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
    marginLeft: '10px',
    padding: '5px',
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '10px',
    paddingLeft: '10px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  radioContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  summaryStyle: {
    marginBottom: '10px',
  },
};
