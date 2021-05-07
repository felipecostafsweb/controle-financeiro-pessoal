import React from 'react';

export default function Button({
  children,
  className,
  style,
  type,
  onClick,
  id,
}) {
  const handleOnClick = () => {
    onClick(children, id);
  };
  return (
    <button onClick={handleOnClick} className={className} style={style}>
      <span className={type === 'icon' ? 'small material-icons' : ''}>
        {children}
      </span>
    </button>
  );
}
