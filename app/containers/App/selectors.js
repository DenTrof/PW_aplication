import { createSelector } from 'reselect';


const selectApp = (state) => state.get('app');
const makeSelectApp = () => createSelector(
  selectApp,
  (substate) => substate.toJS()
);


const selectForm = (state) => state.get('form');
const makeSelectForm = () => createSelector(
  selectForm,
  (substate) => substate.syncValidation
);

const makeSelectFormReg = () => createSelector(
  selectForm,
  (substate) => substate.syncRegistration
);


// export default makeSelectApp;
export {
  makeSelectApp,
  makeSelectForm,
  makeSelectFormReg,
};

