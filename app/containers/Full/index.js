import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from 'components/Header/';
import Footer from 'components/Footer/';
import AccountsPage from 'containers/AccountsPage/';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <main className="main">
            <Container fluid>
              <BrowserRouter>
                <Switch>
                  <Route path="/" name="Accounts" component={AccountsPage} />
                </Switch>
              </BrowserRouter>
            </Container>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
