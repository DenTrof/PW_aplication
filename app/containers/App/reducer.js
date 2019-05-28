/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { TOKEN_ACTION } from './constants';


const initialState = fromJS({
  token: '',
});


function appReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_ACTION:
      return state.set('token', action.token);
    default:
      return state;
  }
}

export default appReducer;
