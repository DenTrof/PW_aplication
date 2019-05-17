/*
 *
 * App actions
 *
 */

import {
  TOKEN_ACTION,
} from './constants';

export function tokenAction(token) {
  return {
    type: TOKEN_ACTION,
    token,
  };
}

