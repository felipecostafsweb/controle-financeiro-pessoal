import React from 'react';

export default function Button({ children, className, style, type, onClick }) {
  const handleOnClick = () => {
    onClick(children);
  };
  return (
    <button onClick={handleOnClick} className={className} style={style}>
      <span className={type === 'icon' ? 'small material-icons' : ''}>
        {children}
      </span>
    </button>
  );
}
