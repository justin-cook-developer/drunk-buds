import React from 'react';
import Field from '../Field/Field';
import FormButtons from '../FormButtons/FormButtons';

const Markup = ({ values, errors, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {['firstName', 'lastName', 'username', 'email', 'password'].map(name => (
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
      <FormButtons />
    </form>
  );
};

export default Markup;
