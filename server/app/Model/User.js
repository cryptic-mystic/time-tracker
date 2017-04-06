'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  isAdmin() {
    return this.role === 'admin'
  }

  isManager() {
    return this.role === 'manager'
  }

  timeEntries() {
    return this.hasMany('App/Model/TimeEntry') 
  }

  static get hidden() {
    return ['password']
  }

  static get rules() { 
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
    }
  }

  static get messages() { 
    return {
      'username.required': 'A username is required',
      'username.unique': 'This username is already in use',
      'email.required': 'A valid email is required',
      'email.email': 'Must be a valid email address',
      'email.unique': 'This email has already been registered',
      'password.required': 'A password is required'
    }
  }
}

module.exports = User
