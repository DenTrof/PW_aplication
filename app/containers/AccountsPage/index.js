
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Badge, Card, CardBody, CardHeader } from 'reactstrap';
import ModalValuesForm from './Forms/ModalValuesForm';
import { makeSelectAccount, makeTransactionList, makeTransactionData } from './selectors';
import { userTransactionLoaded, userListLoaded, formAutocomplite } from './actions';


export class Accounts extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    newBalance: false,
  };

  // Table list to top
  componentDidMount() {
    const sort = document.querySelector('.order');
    sort.click();
  }

  componentDidUpdate() {
    const { userTransaction } = this.props.account;

    if (userTransaction) {
      this.setState({
        newBalance: userTransaction.balance,
      });
    }
  }

  // Create a new transaction
  sendAmount = () => {
    const { sendmoney } = this.props;
    return sendmoney();
  }

  // User list by name (autocomplete)
  filterName = () => {
    const { filtername } = this.props;
    return filtername();
  }

  // Create a new transaction as a copy from
  handleRowSelect = (row) => {
    const { formcomplite } = this.props;
    return formcomplite({ name: row.username, amount: row.amount });
  }

  render() {
    const options = {
      onRowClick: this.onRowClick,
      page: 1,  // which page you want to show as default
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5,  // the pagination bar size.
      prePage: '<<', // Previous page button text
      nextPage: '>>', // Next page button text
      firstPage: 'Первая', // First page button text
      lastPage: 'Последняя', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      hideSizePerPage: true, // You can hide the dropdown for sizePerPage
    };
    const { userInfo, userTrList } = this.props.account;
    const selectRow = {
      mode: 'checkbox',
      onSelect: this.handleRowSelect,
    };
    return (
      <div id="cmaccounts">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>Transaction Page Rules
            <Badge color="info" className="float-right">Documentations</Badge>
            </CardHeader>
            <CardBody>
              <ul>
                <li>Create a new transaction: you must enter data in "Transaction form"
                  manually or copy transaction from "Transaction List"</li>
                <li>Copy transaction: you must to marked choosen field and enter "Copy" button
                  ( selected value with minus will be convert to plus )
                </li>
              </ul>
            </CardBody>
          </Card>
          <p /><p />
          <Card className="pw_main">
            <div className="pw_main_1">
              <CardHeader>Transaction form
                <div className="pw_main_11">
                  <span>User Name: <b style={{ color: 'blue' }}>{userInfo.name}</b></span>
                  <span>User Balance: <b style={{ color: 'green' }}>
                    {this.state.newBalance ? this.state.newBalance : userInfo.balance}</b>
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <ModalValuesForm handleSubmit={this.sendAmount} onFormChange={this.filterName} />
              </CardBody>
            </div>
            <div className="pw_main_2">
              <CardHeader>Transaction List </CardHeader>
              <CardBody>
                <BootstrapTable
                  data={userTrList}
                  striped
                  hover
                  pagination
                  options={options}
                  selectRow={selectRow}
                  version="4"
                >
                  <TableHeaderColumn isKey width="10%" dataField="id" >
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="date" width="25%" dataSort >
                    Date/Time
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="username" width="45%" >
                    Correspondent Name
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="amount" width="20%" >
                    Transaction amount
                  </TableHeaderColumn>
                </BootstrapTable>
              </CardBody>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendmoney: () => dispatch(userTransactionLoaded()),
    filtername: () => dispatch(userListLoaded()),
    formcomplite: (formData) => dispatch(formAutocomplite(formData)),
  };
}

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  trasactionList: makeTransactionList(),
  transactionData: makeTransactionData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'account', reducer });
const withSaga = injectSaga({ key: 'account', saga });

Accounts.propTypes = {
  sendmoney: PropTypes.func,
  filtername: PropTypes.func,
  userTransaction: PropTypes.func,
  userInfo: PropTypes.object,
  userTrList: PropTypes.object,
  account: PropTypes.object,
  formcomplite: PropTypes.func,
};

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Accounts);
