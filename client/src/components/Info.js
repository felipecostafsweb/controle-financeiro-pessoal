import React from 'react';
import { formatNumber } from '../helpers/formatHelpers';

export default function Info({ label, value, color }) {
  return (
    <div>
      <span style={{ fontWeight: 'bold' }}>{label}: </span>
      <span style={{ fontWeight: 'bold' }} className={color}>
        {formatNumber(value)}
      </span>
    </div>
  );
}
