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

export function logout() {
    return {
        type: actionTypes.LOGOUT
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

export function createTime() {
    return function (dispatch) {
        console.log('Create new time!')
    }
}

export function getProfile() {
    return function (dispatch) {
        console.log('Refresh user profile!')
    }
}

export default {
    actionTypes,
    signUp,
    signIn,
    logout,
    createTime,
    getProfile
}
