/*
 *
 * AccountPage actions
 *
 */

import {
  LOAD_USER_INFO, USER_INFO_ERROR, USER_LIST,
  USER_TRANSACTION, USER_LIST_DATA, USER_TRANSACTION_LIST,
  USER_TRANSACTION_DATA, USER_DATA_COPY,
} from './constants';

export function ServerDataLoaded(userInfo) {
  return {
    type: LOAD_USER_INFO,
    userInfo,
  };
}

export function ServerDataLoadingError(error) {
  return {
    type: USER_INFO_ERROR,
    error,
  };
}

export function userListLoaded() {
  return {
    type: USER_LIST,
  };
}
export function userListData(users) {
  return {
    type: USER_LIST_DATA,
    users,
  };
}

export function userTransactionLoaded() {
  return {
    type: USER_TRANSACTION,
  };
}
export function transactionData(transaction) {
  return {
    type: USER_TRANSACTION_DATA,
    transaction,
  };
}
export function userTransactionList(allTransactions) {
  return {
    type: USER_TRANSACTION_LIST,
    allTransactions,
  };
}

export function formAutocomplite(formData) {
  return {
    type: USER_DATA_COPY,
    formData,
  };
}
