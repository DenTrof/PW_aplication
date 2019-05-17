import { createStructuredSelector } from 'reselect';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { makeUserName, makeInitializeData } from '../selectors';
import { AutoComplete, TextField } from 'redux-form-material-ui';

// validation functions
const required = (value) => (value == null ? 'Required' : undefined);
const number = (value) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

class AmountForm extends Component {
  componentDidMount() {
    this.ref // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus(); // on TextField
  }

  saveRef = (ref) => (this.ref = ref);

  // Initialize amountForm input data logic
  handleInitialize = () => {
    const { dataCopy } = this.props;

    const initData = dataCopy;
    this.props.initialize(initData);
  }


  render() {
    const { handleSubmit, onFormChange, pristine, invalid,
      reset, submitting, valuesFormName } = this.props;

    let fileredUserName = null;
    if (valuesFormName) {
      fileredUserName = valuesFormName.map((item) => item.name);
    }
    return (
      <MuiThemeProvider>
        <form onChange={onFormChange} >
          <div>
            <button type="button" onClick={this.handleInitialize}>Copy</button>
          </div>
          <div className="res_main">
            <label>Recipient Name</label>
            <Field
              className="res_name"
              name="name"
              component={AutoComplete}
              openOnFocus
              filter={MUIAutoComplete.fuzzyFilter}
              dataSource={fileredUserName}
              validate={required}
            />
          </div>
          <div className="res_main">
            <label>Amount</label>
            <Field
              name="amount"
              component={TextField}
              validate={[required, number]}
              ref={this.saveRef}
              withRef
            />
          </div>
          <div>
            <button type="button" disabled={submitting || invalid } onClick={handleSubmit}>
              Submit
          </button>
            <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear
          </button>
          </div>
        </form>
      </MuiThemeProvider>
    );
  }
}

AmountForm.propTypes = {
  handleSubmit: PropTypes.func,
  onFormChange: PropTypes.func,
  valuesFormName: PropTypes.object,
  dataCopy: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  valuesFormName: makeUserName(),
  dataCopy: makeInitializeData(),
});

AmountForm = connect(mapStateToProps, null)(AmountForm);

AmountForm = reduxForm({
  form: 'AmountForm',
})(AmountForm);

export default AmountForm;
