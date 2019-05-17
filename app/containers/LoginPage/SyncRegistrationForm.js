import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (values.password !== values.passwordComf) {
    errors.passwordComf = 'Wrong password';
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );

const SyncRegistrationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;

  return (
    <form >
      <Field
        name="username"
        type="text"
        component={renderField}
        label="User name"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      <Field
        name="passwordComf"
        type="password"
        component={renderField}
        label="Confirm password"
      />
      <Field
        name="email"
        type="email"
        component={renderField}
        label="E-mail"
      />
      <div style={{ marginTop: '20px' }}>
        <button type="button" disabled={pristine || submitting || invalid} onClick={handleSubmit}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

SyncRegistrationForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'syncRegistration', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  // warn, // <--- warning function given to redux-form
})(SyncRegistrationForm);
