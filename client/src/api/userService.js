import axios from 'axios'

var a = axios.create({
    baseURL: `${process.env.API_URL}/api/v1/users`
})

export function signIn(email, password) {
    return a.post('/login', { email, password })
}

export function signUp(username, email, password) {
    return a.post('/', { username, email, password })
}

export function profile(token) {
    return a.get('/profile', {
      headers: {'Authorization': `Bearer ${token}`}
    })
}

export function times(startDate, endDate, token) {
    return a.get('/times', {
      headers: {'Authorization': `Bearer ${token}`},
      params: { startDate, endDate }
    })
}

export function report(token) {
    return a.get('/report', {
      headers: {'Authorization': `Bearer ${token}`}
    })
}

export function users(token) {
  return a.get('/', {
    headers: {'Authorization': `Bearer ${token}`}
  })
}

export function remove(id, token) {
  return a.delete(`/${id}`, {
    headers: {'Authorization': `Bearer ${token}`}
  })
}

export function update(id, values, token) {
    return a.put(`/${id}`, values, {
      headers: {'Authorization': `Bearer ${token}`}
    })
}

export function view(id, startDate, endDate, token) {
    return a.get(`/${id}`, {
      headers: {'Authorization': `Bearer ${token}`},
      params: { startDate, endDate }
    })
}

export default {
    signIn,
    signUp,
    profile,
    times,
    report,
    users,
    remove,
    update,
    view
}