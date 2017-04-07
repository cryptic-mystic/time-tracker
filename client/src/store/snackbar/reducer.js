import { actionTypes } from './actions'
import Immutable from 'immutable'

export var initialState = Immutable.Map({
    open: false,
    message: ''
})

export function snackbar(state, action) {
    if (typeof state === 'undefined') return initialState

    switch (action.type) {
        case actionTypes.SNACKBAR_MESSAGE:
            return state.merge({
              open: true,
              message: action.message
            })
        case actionTypes.SNACKBAR_HIDE:
            return initialState
    }

    return state
}

export default {
    initialState,
    snackbar
}