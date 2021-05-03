import React from 'react';

export default function Filter({ value, onFilterChange }) {
  const handleTyping = (event) => {
    onFilterChange(event.target.value);
  };
  return (
    <div style={{ flexGrow: '4' }} className="input-field">
      <input
        placeholder="Filtro"
        value={value}
        id="filter"
        type="text"
        onChange={handleTyping}
        className="validate"
      ></input>
    </div>
  );
}
