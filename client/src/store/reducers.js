import { combineReducers } from 'redux'
// import { combineReducers } from 'redux-immutable'
import Immutable from 'immutable'

import { user } from './user/reducer'
import { users } from './users/reducer'
import { snackbar } from './snackbar/reducer'

export const makeRootReducer = () => {
  return combineReducers({ user, users, snackbar })
}

export default makeRootReducer
