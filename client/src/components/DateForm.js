import React from 'react';

export default function DateForm({
  periodsAndNames,
  onSelect,
  currentPeriod,
  currentId,
}) {
  const handleSelectChange = ({ currentTarget }) => {
    onSelect(currentTarget.value);
  };

  return (
    <div>
      <div className="input-field ">
        <select
          className="browser-default"
          name="select"
          onChange={handleSelectChange}
          defaultValue={currentPeriod}
        >
          {periodsAndNames.map((entry) => {
            return (
              <option
                key={entry.id}
                value={entry.id}
                selected={entry.id === currentId ? true : false}
              >
                {entry.periodName}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
