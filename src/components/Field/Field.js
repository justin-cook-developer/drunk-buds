import React from 'react';

const Field = ({ name, displayName, value, error, handleChange }) => {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {`${displayName ? displayName : name[0].toUpperCase() + name.slice(1)}`}
      </label>
      <p className="control">
        <input
          className="input"
          type={`${
            name === 'password' ? name : name === 'email' ? name : 'text'
          }`}
          name={name}
          required={true}
          value={value}
          onChange={handleChange}
        />
      </p>
      {error && error.length && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default Field;
