import React from 'react';
import Button from './Button';
import DateForm from './DateForm';

export default function DateContainer({
  allPeriods,
  handlePeriodChangeTop,
  currentId,
  handlePeriodChangeByClick,
}) {
  const handlePeriodChange = (periodId) => {
    handlePeriodChangeTop(periodId);
  };

  const handleButtonClick = (target) => {
    handlePeriodChangeByClick(target);
  };

  return (
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
        periodsAndNames={allPeriods}
        onSelect={handlePeriodChange}
        currentId={currentId}
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
    justifyContent: 'center',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
};
