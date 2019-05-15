import React from 'react';
import classnames from 'classnames';

const InputItem = ({ placeholder, name, onChange, errors, type = 'text' }) => {
  return (
    <div
      className={classnames('form-input-item', {
        'form-input-error': errors
      })}
    >
      <input
        type={type}
        placeholder={placeholder}
        name={placeholder}
        value={name}
        onChange={onChange}
      />
      <p className="invalid-feedback small">{errors || ''}</p>
    </div>
  );
};

export default InputItem;
