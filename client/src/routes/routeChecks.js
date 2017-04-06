
export function requiresAuthentication(store) {
  return function (args, replace) {
    var { user } = store.getState()
    if (!user.get('authenticated')) {
      console.error('NOT AUTHENTICATED')
      replace('/') // Todo set login error message
    }
  }
}

export default { requiresAuthentication }