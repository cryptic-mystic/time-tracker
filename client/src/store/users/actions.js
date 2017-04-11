import userService from '../../api/userService'
import timeEntryService from '../../api/timeEntryService'

// actionTypes
export const actionTypes = {
    USERS_UPDATED: 'USERS_UPDATED',
    USER_DELETED: 'USER_DELETED',
    USER_UPDATED: 'USER_UPDATED'
}

// actions
export function usersUpdated(users) {
    return {
        type: actionTypes.USERS_UPDATED,
        users
    }
}

export function userDeleted(id) {
    return {
        type: actionTypes.USER_DELETED,
        id
    }
}

export function userUpdated(id, values) {
    return {
        type: actionTypes.USER_UPDATED,
        id, values
    }
}

// thunks
export function getUsers() {
    return function (dispatch, getState) {
        let { user } = getState(),
            token = user.get('token')

        return userService.users(token)
            .then(function (success) {
                dispatch(usersUpdated(success.data))
            })
            .catch(function (failure) {
                var { error, errors } = failure.response.data

                debugger
                if (errors && errors.length) throw errors[0]
                else if (error && error.field) throw error
            })
    }
}

export function deleteUser(id) {
    return function (dispatch, getState) {
        let { user } = getState(),
            token = user.get('token')

        return userService.remove(id, token)
            .then(function (success) {
                return dispatch(userDeleted(id))
            })
            .catch(function (failure) {
                var { error, errors } = failure.response.data

                debugger
                if (errors && errors.length) throw errors[0]
                else if (error && error.field) throw error
            })
    }
}

export function updateUser(id, values) {
    return function (dispatch, getState) {
        let { user } = getState(),
            token = user.get('token')

        return userService.update(id, values, token)
            .then(function (success) {
                return dispatch(userUpdated(id, values))
            })
            .catch(function (failure) {
                var { error, errors } = failure.response.data

                if (errors && errors.length) throw errors[0]
                else if (error && error.field) throw error
                debugger
            })
    }
}

export default {
    getUsers,
    deleteUser,
    updateUser
}
