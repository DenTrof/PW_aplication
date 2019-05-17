/*
 *
 * App reducer
 *
 */

import { AbilityBuilder } from '@casl/ability';

import { fromJS } from 'immutable';
import Cookie from 'app-cookie';

import { TOKEN_ACTION } from './constants';


const initialState = fromJS({
  token: 'L8WhEmvPkK40fvyRo-WLBQ',
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
