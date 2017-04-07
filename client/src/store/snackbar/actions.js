
// actionTypes
export const actionTypes = {
    SNACKBAR_MESSAGE: 'SNACKBAR_MESSAGE',
    SNACKBAR_HIDE: 'SNACKBAR_HIDE'
}

// actions
export function snackbarMessage(message) {
    return {
        type: actionTypes.SNACKBAR_MESSAGE,
        message
    }
}

export function snackbarHide() {
    return {
        type: actionTypes.SNACKBAR_HIDE
    }
}

export default {
    actionTypes,
    snackbarMessage,
    snackbarHide
}
