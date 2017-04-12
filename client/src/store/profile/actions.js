import userService from '../../api/userService'
import timeEntryService from '../../api/timeEntryService'

// actionTypes
export const actionTypes = {
    PROFILE_UPDATED: 'PROFILE_UPDATED'
}

// actions
export function profileUpdated(data) {
    return {
        type: actionTypes.PROFILE_UPDATED,
        data
    }
}

// thunks
export function viewProfile(id, startDate, endDate) {
    return function (dispatch, getState) {
        let { user } = getState(),
            token = user.get('token')

        return userService.view(id, startDate, endDate, token)
            .then(function (success) {
                return dispatch(profileUpdated(success.data))
            })
            .catch(function (failure) {
                var { error, errors } = failure.response.data

                debugger
                if (errors && errors.length) throw errors[0]
                else if (error && error.field) throw error
            })
    }
}

export default {
    viewProfile
}
