import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
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

const SyncValidationForm = (props) => {
  const { handleSubmitLog, pristine, reset, submitting } = props;

  return (
    <form >
      <Field
        name="email"
        type="text"
        component={renderField}
        label="E-mail"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      <div style={{marginTop:'20px'}}>
        <button type="button" disabled={pristine || submitting} onClick={handleSubmitLog}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

SyncValidationForm.propTypes = {
  handleSubmitLog: PropTypes.func,
};

export default reduxForm({
  form: 'syncValidation', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(SyncValidationForm);
