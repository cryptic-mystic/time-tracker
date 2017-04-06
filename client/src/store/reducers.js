import { combineReducers } from 'redux'
// import { combineReducers } from 'redux-immutable'
import Immutable from 'immutable'

import { user } from './user/reducer'

export const makeRootReducer = () => {
  return combineReducers({ user })
}

export default makeRootReducer
