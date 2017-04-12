import { actionTypes } from './actions'
import Immutable from 'immutable'

export var initialState = null

export function profile(state, action) {
    if (typeof state === 'undefined') return initialState

    switch (action.type) {
        case actionTypes.PROFILE_UPDATED:
            return Immutable.fromJS(action.data)
        default:
            return state
    }

    return state
}

export default {
    initialState,
    profile
}