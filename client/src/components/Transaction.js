import React from 'react';
import { formatDay, formatNumber } from '../helpers/formatHelpers';
import Button from './Button';

export default function Transaction({
  id,
  description,
  value,
  category,
  type,
  day,
  onBtnClick,
}) {
  const handleButtonClick = (target) => {
    onBtnClick(target);
  };

  return (
    <div
      className={`waves-effect waves-light card horizontal ${
        type === '+' ? 'green accent-1' : 'red accent-1'
      } `}
      style={styles.cardContainer}
    >
      <span style={styles.dayStyle}>{formatDay(day)}</span>
      <div style={styles.textContainer}>
        <span style={{ fontWeight: 'bold' }}>{category}</span>
        <span>{description}</span>
      </div>
      <span style={styles.valueStyle}>{formatNumber(value)}</span>
      <div style={styles.iconContainer}>
        <Button
          style={styles.btn}
          type="icon"
          className={` ${type === '+' ? 'green accent-1' : 'red accent-1'} `}
          onClick={handleButtonClick}
        >
          edit
        </Button>
        <Button
          style={styles.btn}
          type="icon"
          className={` ${type === '+' ? 'green accent-1' : 'red accent-1'} `}
          onClick={handleButtonClick}
        >
          delete
        </Button>
      </div>
    </div>
  );
}

const styles = {
  btn: {
    border: '0px',
    cursor: 'pointer',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: '30px auto 100px 10% ',
    alignItems: 'center',
    justifyItems: 'center',
    padding: '5px',
    gridGap: '5px',
    cursor: 'default',
    borderRadius: '5px',
    marginBottom: '0px',
  },

  dayStyle: {
    fontWeight: 'bold',
    justifySelf: 'start',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifySelf: 'start',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'right',
  },
};
