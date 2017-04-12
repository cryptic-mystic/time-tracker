import { combineReducers } from 'redux'
// import { combineReducers } from 'redux-immutable'
import Immutable from 'immutable'

import { user } from './user/reducer'
import { users } from './users/reducer'
import { profile } from './profile/reducer'
import { snackbar } from './snackbar/reducer'

export const makeRootReducer = () => {
  return combineReducers({ user, users, profile, snackbar })
}

export default makeRootReducer
