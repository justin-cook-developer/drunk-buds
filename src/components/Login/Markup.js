import React from 'react';
import Field from '../Field/Field';
import FormButtons from '../FormButtons/FormButtons';

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
      <FormButtons />
    </form>
  );
};

export default Markup;
