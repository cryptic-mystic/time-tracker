import userService from '../../api/userService'

// actionTypes
export const actionTypes = {
    AUTHENTICATED: 'AUTHENTICATED',
    LOGOUT: 'LOGOUT'
}

// actions
export function authenticated(token) {
    return {
        type: actionTypes.AUTHENTICATED,
        token: token
    }
}

// thunks
export function signUp(username, email, password) {
    return function (dispatch) {
        return userService.signUp(username, email, password)
            .then(function (response) {
                console.log(response)
                dispatch(authenticated(response.data.token))
            })
            .catch(function (error) {
                console.error(error)
                throw error
            })
    }
}

export function signIn(email, password) {
    return function (dispatch) {
        return userService.signIn(email, password)
            .then(function (response) {
                console.log(response)
                dispatch(authenticated(response.data.token))
            })
            .catch(function (error) {
                console.error(error)
                throw error
            })
    }
}

export default {
    actionTypes,
    signUp,
    signIn
}
