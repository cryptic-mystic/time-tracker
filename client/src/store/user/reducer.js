import { actionTypes } from './actions'

var initialState = {
    id: null
}

export default function user(state, action) {
    if (typeof state === 'undefined') return initialState

    switch (action.type) {
        case actionTypes.USER_UPDATED:
            return Object.assign({}, state, action.user)
        // case userActionTypes.LOGOUT:
        //     return false
    }

    return state
}