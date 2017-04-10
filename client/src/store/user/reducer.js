import { actionTypes } from './actions'
import Immutable from 'immutable'

export var initialState = Immutable.Map({
    authenticated: false,
    token: null,
    profile: null,
    timeEntries: null
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
        case actionTypes.USER_UPDATED:
            return state.merge(Immutable.fromJS(action.details))
        case actionTypes.TIME_DELETED:
            var timeEntries = state.get('timeEntries'),
                indexToRemove = timeEntries.findIndex((entry) => entry.get('id') === action.id)

            return state.set('timeEntries',
                state.get('timeEntries').remove(indexToRemove)
            )
    }

    return state
}

export default {
    initialState,
    user
}