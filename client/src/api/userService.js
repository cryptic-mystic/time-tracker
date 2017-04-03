import axios from 'axios'
import uuidV4 from 'uuid/v4'

var a = axios.create({
        baseURL: process.env.API_URL
    }),
    CancelToken = axios.CancelToken,
    cancellationSource = null

export function syncUser(user) {

    // Cancels previous request if user keeps typing
    if (cancellationSource !== null) cancellationSource.cancel('User canceled operation')

    cancellationSource = CancelToken.source()

    return a.post('/usersController', {
        user: user
    }, {
        validateStatus: function (status) { return status == 200 },
        cancelToken: cancellationSource.token
    })
}

export default {
    syncUser
}