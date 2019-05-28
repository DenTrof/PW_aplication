/**
 *
 * App
 *
 */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectApp } from './selectors';
import reducer from './reducer';
import saga from './saga';
import axios from 'axios';
import LoginPage from 'containers/LoginPage';
import Full from 'containers/Full/';
import NotFoundPage from 'containers/NotFoundPage';
import { makeSelectForm, makeSelectFormReg } from './selectors';
import { tokenAction } from './actions';


// Styles
import '../../scss/style.scss';


class App extends React.PureComponent {

  state = {
    created: '',
    token: '',
  }

  componentDidMount() {
    // Remove loader, when page is loaded
    const ele = document.getElementById('ipl-progress-indicator');
    if (ele) {
      setTimeout(() => {
        ele.classList.add('available');
        setTimeout(() => {
          ele.outerHTML = '';
        }, 2000);
      }, 1000);
    }
  }

  // Sending data from ragistration form
  registration = () => {
    // eslint-disable-next-line no-shadow
    const { makeSelectFormReg } = this.props;

    if (makeSelectFormReg) {
      axios.post('http://193.124.114.46:3001/users',
        {
          username: makeSelectFormReg.values.username,
          password: makeSelectFormReg.values.password,
          email: makeSelectFormReg.values.email,
        })
        .then((res) => {
          const created = res.statusText;
          const token = res.data.id_token;
          if (created === 'Created') {
            alert('Profile successfully created');
          }
          this.setState({ created, token });
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  }

  // Sending data from loging form
  logging = () => {
    // eslint-disable-next-line no-shadow
    const { makeSelectForm } = this.props;

    if (makeSelectForm) {
      axios.post('http://193.124.114.46:3001/sessions/create',
        {
          email: makeSelectForm.values.email,
          password: makeSelectForm.values.password,
        })
        .then((res) => {
          const created = res.statusText;
          const token = res.data.id_token;
          if (created !== 'Created') {
            alert('Incorrect entered data');
          }
          this.setState({ created, token });
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  }

  renderLogin = () => (<LoginPage registration={this.registration} logging={this.logging} />
  )

  renderMain = () => (
    <Full />
  )

  render() {
    let content = null;

    if (this.state.created === 'Created') {
      const { saveToken } = this.props;
      saveToken(this.state.token);
      content = this.renderMain();
    } else {
      content = this.renderLogin();
    }

    return (<div>{content}</div>);
  }

}

App.propTypes = {
  makeSelectForm: PropTypes.object,
  makeSelectFormReg: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
  loginFormData: makeSelectForm(),
  makeSelectFormReg: makeSelectFormReg(),
  makeSelectForm: makeSelectForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveToken: (token) => dispatch(tokenAction(token)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });


export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
