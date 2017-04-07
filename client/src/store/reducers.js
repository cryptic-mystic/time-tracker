import { combineReducers } from 'redux'
// import { combineReducers } from 'redux-immutable'
import Immutable from 'immutable'

import { user } from './user/reducer'
import { snackbar } from './snackbar/reducer'

export const makeRootReducer = () => {
  return combineReducers({ user, snackbar })
}

export default makeRootReducer
