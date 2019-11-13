import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  USER_UPDATED,
} from '../actions/users.actions';

/**
 * This reducer manages/handles the actions in the users.actions.js file.
 * Whatever the reducer function returns becomes the new state.
 */

export function UsersReducer(state = null, action) {
  switch(action.type) {
    case SIGN_UP:
    case USER_UPDATED:
    case SIGN_IN: {
      return action.user;
    }
    case SIGN_OUT: {
      return null;
    }
    default: {
      return state;
    }
  }
}