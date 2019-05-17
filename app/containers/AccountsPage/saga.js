import { put, all, throttle, select } from 'redux-saga/effects';
import axios from 'axios';
import { USER_TRANSACTION, USER_LIST } from './constants';
import { ServerDataLoaded, userListData, transactionData,
  userTransactionList,
} from './actions';
import { makeSelectApp } from 'containers/App/selectors';
import { makeValuesForm } from './selectors';

export function* callDataSaga() {
  const userToken = yield select(makeSelectApp());

  try {
    const userInfo = yield axios(
      {
        method: 'get',
        url: 'http://193.124.114.46:3001/api/protected/user-info',
        headers: { Authorization: `Bearer ${userToken.token}` },
      }
    );
    yield put(ServerDataLoaded(userInfo.data));
  } catch (err) {
    alert(err.response.data);
  }
}

export function* callTrList() {
  const userToken = yield select(makeSelectApp());

  try {
    const userTrList = yield axios.get('http://193.124.114.46:3001/api/protected/transactions',
      { headers: { Authorization: `Bearer ${userToken.token}` } }
    );
    yield put(userTransactionList(userTrList.data.trans_token));
  } catch (err) {
    alert(err.response.data);
  }
}

export function* callMakeTransactions() {
  const userToken = yield select(makeSelectApp());
  const formValue = yield select(makeValuesForm());

  let userAmount = null;
  let recipientName = null;

  if (formValue.AmountForm) {
    userAmount = formValue.AmountForm.values.amount;
    recipientName = formValue.AmountForm.values.name;
  }
  try {
    const userTransaction = yield axios.post('http://193.124.114.46:3001/api/protected/transactions',
      {
        name: recipientName,
        amount: Math.abs(userAmount),
      },
      {
        headers: { Authorization: `Bearer ${userToken.token}` },
      }
    );
    yield put(transactionData(userTransaction.data.trans_token));
  } catch (err) {
    alert(err.response.data);
  }
}

export function* callUserList() {
  const userToken = yield select(makeSelectApp());
  const formValue = yield select(makeValuesForm());

  let filterName = null;
  if (formValue.AmountForm) {
    filterName = formValue.AmountForm.values.name;
  }

  try {
    if (filterName) {
      const userList = yield axios.post('http://193.124.114.46:3001/api/protected/users/list',
        { filter: filterName },
        { headers: { Authorization: `Bearer ${userToken.token}` } }
      );
      yield put(userListData(userList.data));
    }
  } catch (err) {
    alert(err.response.data);
  }
}

export default function* generalSaga() {
  yield all([
    throttle(500, USER_TRANSACTION, callMakeTransactions),
    throttle(500, USER_LIST, callUserList),
    callDataSaga(),
    callUserList(),
    callTrList(),
  ]);
}
