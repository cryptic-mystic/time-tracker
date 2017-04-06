import { actionTypes } from './actions'
import Immutable from 'immutable'

export var initialState = Immutable.Map({
    authenticated: false,
    token: null,
    profile: null
})

export function user(state, action) {
    if (typeof state === 'undefined') return initialState

    switch (action.type) {
        case actionTypes.AUTHENTICATED:
            return state.merge({
              authenticated: true,
              token: action.token
            })
        case actionTypes.LOGOUT:
            return initialState
    }

    return state
}

export default {
    initialState,
    user
}