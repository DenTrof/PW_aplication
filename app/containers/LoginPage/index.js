/*
 * LoginPage
 *
 **/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Button, Card, CardBody } from 'reactstrap';
import SyncValidationForm from './SyncValidationForm';
import SyncRegistrationForm from './SyncRegistrationForm';


class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    showForm: true,
  };
  componentDidMount() {
    const btnAct = document.querySelector('.btn_2');
    const btnNone = document.querySelector('.btn_1');

    btnAct.addEventListener('click', () => {
      btnNone.classList.toggle('user-active');
      btnAct.classList.toggle('user-active');
    });

    btnNone.addEventListener('click', () => {
      btnNone.classList.toggle('user-active');
      btnAct.classList.toggle('user-active');
    });
  }

  // User registration
  onSubmit = () => {
    const { registration } = this.props;
    registration();
  }

  // Logging in
  onSubmitLog = () => {
    const { logging } = this.props;
    logging();
  }

  // Toggle Logging/Registration
  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm,
    });
  }

  render() {
    return (this.state.showForm ? <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Card className="p-2">
            <div className="button-p-2">
              <Button className="user-active btn_1" onClick={this.toggleForm}><i className="fa fa-user-plus"></i>  Logging</Button>
              <Button className="btn_2" onClick={this.toggleForm}><i className="fa fa-user-plus"></i>  Registration</Button >
            </div>
            <CardBody>
              <SyncValidationForm handleSubmitLog={this.onSubmitLog} />
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div> :
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Card className="p-2">
            <div className="button-p-2">
              <Button className="user-active btn_1" onClick={this.toggleForm}><i className="fa fa-user-plus"></i>  Logging</Button>
              <Button className="btn_2" onClick={this.toggleForm}><i className="fa fa-user-plus"></i>  Registration</Button >
            </div>
            <CardBody>
              <SyncRegistrationForm handleSubmit={this.onSubmit} />
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
    );
  }
}

LoginPage.propTypes = {
  registration: PropTypes.func,
  logging: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
export default connect(null, mapDispatchToProps)(LoginPage);
