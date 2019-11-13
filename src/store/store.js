import { createStore, combineReducers } from 'redux';

/**
 * Import all reducers
 */

import { UsersReducer } from './reducers/users.reducer';

const all_reducers = combineReducers({
  user: UsersReducer,
});

export const store = createStore(all_reducers);