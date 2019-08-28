import React from 'react';
import Field from '../Field/Field';

const Markup = ({
  values,
  errors,
  handleChange,
  handleSubmit,
  handleCancel,
}) => {
  const fields = ['name', 'agenda', 'location'];

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(name => (
        <Field
          key={name}
          name={name}
          value={values[name]}
          error={errors[name]}
          displayName={
            name === 'firstName'
              ? 'First Name'
              : name === 'lastName'
              ? 'Last Name'
              : null
          }
          handleChange={handleChange}
        />
      ))}
      <div className="field">
        <label htmlFor="startTime">Start Time</label>
        <p className="control">
          <input
            value={values.startTime}
            onChange={handleChange}
            className="input"
            name="startTime"
            type="date"
          />
        </p>
        {errors.startTime && errors.startTime.length && (
          <p className="help is-danger">{errors.startTime}</p>
        )}
      </div>
      <div className="field is-grouped is-grouped-centered">
        <p className="control">
          <button type="submit" className="button">
            Submit
          </button>
        </p>
        <p className="control">
          <button type="button" className="button" onClick={handleCancel}>
            Cancel
          </button>
        </p>
      </div>
    </form>
  );
};

export default Markup;
