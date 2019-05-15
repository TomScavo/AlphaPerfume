import React from 'react';

export default function Spinner({ size }) {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border"
        style={{ width: `${size}rem`, height: `${size}rem` }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
