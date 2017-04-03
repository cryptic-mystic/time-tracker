import userService from '../../api/userService'

// actionTypes
export const actionTypes = {
    USER_UPDATED: 'USER_UPDATED',
}

// actions
export function userUpdated(user) {
    return {
        type: actionTypes.USER_UPDATED,
        user
    }
}

// thunks
export function syncUser(user) {
    return function (dispatch) {
        dispatch(userUpdated(user))
        return userService.syncUser(user)
            .then(function (response) {
                var data = response.data
                console.log(data)
                console.log('Success!!!')
            })
            .catch(function (error) {
                console.error(error)
            })
    }
}


export default {
    actionTypes,
    syncUser
}
