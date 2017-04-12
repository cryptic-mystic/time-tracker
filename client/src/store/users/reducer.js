import { actionTypes } from './actions'
import Immutable from 'immutable'

export var initialState = null

export function users(state, action) {
    if (typeof state === 'undefined') return initialState

    switch (action.type) {
        case actionTypes.USERS_UPDATED:
            return Immutable.fromJS(action.users)
        case actionTypes.USER_DELETED:
            var indexToRemove = state.findIndex((user) => user.get('id') === action.id)
            return state.remove(indexToRemove)
        case actionTypes.USER_CHANGED:
            var indexToUpdate = state.findIndex((user) => user.get('id') === action.id)
            return state.update(indexToUpdate, (value) => value.merge(action.values))
        default:
            return state
    }

    return state
}

export default {
    initialState,
    users
}