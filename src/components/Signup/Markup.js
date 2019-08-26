import React from 'react';
import Field from '../Field/Field';
import FormButtons from '../FormButtons/FormButtons';

const Markup = ({ signup, values, errors, handleChange, handleSubmit }) => {
  const fields = ['firstName', 'lastName', 'username', 'email'];
  if (signup) {
    fields.push('password');
  }
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
      <FormButtons />
    </form>
  );
};

export default Markup;
