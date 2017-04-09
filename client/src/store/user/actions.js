import userService from '../../api/userService'
import timeEntryService from '../../api/timeEntryService'

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
            .then(function (success) {
                console.log(success)
                dispatch(authenticated(success.data.token))
            })
            .catch(function (failure) {
                var { error, errors } = failure.response.data

                if (errors && errors.length) throw errors[0]
                else if (error && error.field) throw error
                debugger
            })
    }
}

export function signIn(email, password) {
    return function (dispatch) {
        return userService.signIn(email, password)
            .then(function (success) {
                console.log(success)
                dispatch(authenticated(success.data.token))
            })
            .catch(function (failure) {
                var { error, errors } = failure.response.data

                if (errors && errors.length) throw errors[0]
                else if (error && error.field) throw error
                debugger
            })
    }
}

export function createTime(date, time, distance) {
    return function (dispatch, getState) {
        let { user } = getState(),
            token = user.get('token')

        return timeEntryService.create(date, time, distance, token)
            .then(function (success) {
                return success.data
            })
            .catch(function (failure) {
                debugger
                throw failure
            })
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
