import React from 'react';

export default function DateForm({
  periodsAndNames,
  onSelect,
  onClick,
  currentPeriod,
}) {
  const handleSelectChange = ({ currentTarget }) => {
    onSelect(currentTarget.value);
  };
  console.log(onClick);
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
                value={entry.period}
                selected={entry.period === currentPeriod ? true : false}
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
