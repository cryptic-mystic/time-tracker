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

export default {
    signIn,
    signUp
}