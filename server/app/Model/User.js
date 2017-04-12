'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  isAdmin() {
    return this.role === 'admin'
  }

  isManager() {
    return this.role === 'manager' || this.isAdmin()
  }

  timeEntries() {
    return this.hasMany('App/Model/TimeEntry') 
  }

  static get hidden() {
    return ['password']
  }

  static get rules() { 
    return {
      username: 'required|string|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      password: 'required|string|min:6|max:30',
      role: 'string|in:admin,manager,member'
    }
  }

  static get update_rules() { 
    return {
      username: 'string|alpha_numeric|unique:users',
      email: 'email|unique:users',
      password: 'string|min:6|max:30',
      role: 'string|in:admin,manager,member'
    }
  }

  static get messages() { 
    return {
      'username.required': 'A username is required',
      'username.unique': 'This username is already in use',
      'username.alpha_numeric': 'Username can only contain letters and numbers',
      'email.required': 'A valid email is required',
      'email.email': 'Must be a valid email address',
      'email.unique': 'This email has already been registered',
      'password.required': 'A password is required',
      'password.min': 'Password must be at least 6 characters',
      'password.max': 'Password cannot exceed 30 characters'
    }
  }
}

module.exports = User
