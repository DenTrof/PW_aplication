/*
 *
 * AccountPage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  LOAD_USER_INFO, USER_LIST_DATA, USER_TRANSACTION_DATA,
  USER_TRANSACTION_LIST, USER_DATA_COPY,
} from './constants';


const initialState = fromJS({
  userInfo: [
    {
      id: 'test',
      name: 'test',
      email: 'test',
      balance: 'test',
    },
  ],
  userList: [
    {
      id: 'test',
      name: 'test',
    },
  ],
  userTransaction: [
    {
      id: 'test',
      date: 'test',
      username: 'test',
      amount: 'test',
      balance: 'test',
    },
  ],
  userTrList: [
    {
      id: 'test',
      date: 'test',
      username: 'test',
      amount: 'test',
      balance: 'test',
    },
  ],
  userDataCopy:
  {
    username: 'test',
    amount: 'test',
  },

});

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_INFO:
      return state.set('userInfo', action.userInfo.user_info_token);
    case USER_LIST_DATA:
      return state.set('userList', action.users);
    case USER_TRANSACTION_DATA:
      return state.set('userTransaction', action.transaction);
    case USER_TRANSACTION_LIST:
      return state.set('userTrList', action.allTransactions);
    case USER_DATA_COPY:
      return state.set('userDataCopy', action.formData);
    default:
      return state;
  }
}

export default accountReducer;
