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

export function requiresManager(store) {
  return function (args, replace) {
    var { user } = store.getState(),
      role = user.getIn(['profile', 'role'])

    if (role !== 'manager' && role !== 'admin') {
      store.dispatch(snackbarMessage('This page requires manager permissions'))
      replace('/profile')
    }
  }
}

export function requiresAdmin(store) {
  return function (args, replace) {
    var { user } = store.getState(),
      role = user.getIn(['profile', 'role'])

    if (role !== 'admin') {
      store.dispatch(snackbarMessage('This page requires admin permissions'))
      replace('/profile')
    }
  }
}

export default { requiresAuthentication, requiresManager, requiresAdmin }