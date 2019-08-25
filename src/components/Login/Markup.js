import React from 'react';

const Field = ({ name, value, error, handleChange }) => {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {name[0].toUpperCase() + name.slice(1)}
      </label>
      <p className="control">
        <input
          className="input"
          type="text"
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

const Markup = ({ values, errors, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {['username', 'password'].map(name => (
        <Field
          key={name}
          name={name}
          value={values[name]}
          error={errors[name]}
          handleChange={handleChange}
        />
      ))}
      <div className="field">
        <div className="buttons">
          <button type="submit" className="button">
            Submit
          </button>
          <button type="button" className="button">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default Markup;
