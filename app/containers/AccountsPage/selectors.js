import { createSelector } from 'reselect';

const selectAccountDomain = (state) => state.get('account');

const formState = (state) => state.get('form');

const makeSelectAccount = () => createSelector(
  selectAccountDomain,
  (substate) => substate.toJS()
);

const makeUserInfo = () => createSelector(
  selectAccountDomain,
  (homeState) => homeState.get('userInfo').toJS()
);

const makeUserName = () => createSelector(
  selectAccountDomain,
  (homeState) => homeState.get('userList')
);
const makeTransactionList = () => createSelector(
  selectAccountDomain,
  (homeState) => homeState.get('userTrList')
);
const makeTransactionData = () => createSelector(
  selectAccountDomain,
  (homeState) => homeState.get('userTransaction')
);

const makeInitializeData = () => createSelector(
  selectAccountDomain,
  (homeState) => homeState.get('userDataCopy')
);

const makeValuesForm = () => createSelector(
  formState,
  (substate) => substate
);


export default makeSelectAccount;
export {
  makeSelectAccount,
  selectAccountDomain,
  makeUserInfo,
  makeValuesForm,
  makeUserName,
  makeTransactionList,
  makeTransactionData,
  makeInitializeData,
};
