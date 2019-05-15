import React from 'react';

export default function Spinner({ size }) {
  return (
    <div className=" spinner-overlay w-100 h-100">
      <div className="d-flex  h-100 justify-content-center align-items-center">
        <div className="spinner-wrap d-flex justify-content-center align-items-center">
          <div
            className="spinner-border "
            style={{ width: `${size}rem`, height: `${size}rem` }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
