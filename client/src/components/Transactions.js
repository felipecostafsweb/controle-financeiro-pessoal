import React from 'react';
import Transaction from './Transaction';

export default function Transactions({ transactions, onBtnClick }) {
  transactions.sort((a, b) => a.day - b.day);
  const handleButtonClick = (target) => {
    onBtnClick(target);
  };

  return (
    <div>
      <ul style={{ display: 'grid', gridGap: '2px' }}>
        {transactions.map(
          ({ _id, description, value, category, type, day }) => {
            return (
              <li key={_id}>
                <Transaction
                  onBtnClick={handleButtonClick}
                  id={_id}
                  description={description}
                  value={value}
                  category={category}
                  type={type}
                  day={day}
                />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
