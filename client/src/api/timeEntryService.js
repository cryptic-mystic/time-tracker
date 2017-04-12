import axios from 'axios'

var a = axios.create({
    baseURL: `${process.env.API_URL}/api/v1/time`
})

export function create(date, time, distance, user_id, token) {
    return a.post('/', { date, time, distance, user_id }, {
      headers: {'Authorization': `Bearer ${token}`}
    })
}

export function remove(id, token) {
    return a.delete(`/${id}`, {
      headers: {'Authorization': `Bearer ${token}`}
    })
}

export function update(id, date, time, distance, token) {
    return a.put(`/${id}`, { date, time, distance }, {
      headers: {'Authorization': `Bearer ${token}`}
    })
}

export default {
    create,
    update,
    remove
}