import { snackbarMessage } from '../store/snackbar/actions'

export function requiresAuthentication(store) {
  return function (args, replace) {
    var { user } = store.getState()
    if (!user.get('authenticated')) {
      store.dispatch(snackbarMessage('Please log in'))
      replace('/')
    }
  }
}

export default { requiresAuthentication }