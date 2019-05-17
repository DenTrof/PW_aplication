import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { logoutAction } from 'containers/App/actions';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from 'components_coreui/Header/';
import Footer from 'components_coreui/Footer/';
import AccountsPage from 'containers/AccountsPage/';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <main className="main">
            <Container fluid>
              <Switch>
                <Route path="/" name="Accounts" component={AccountsPage} />
              </Switch>
            </Container>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction(false)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Full);
