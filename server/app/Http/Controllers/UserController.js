'use strict'

const Antl = use('Antl')
const _ = use('lodash')
const moment = use('moment')

const Auth_Errors = {
  UserNotFoundException: { field: 'email', message: 'Could not find a user with that email' },
  PasswordMisMatchException: { field: 'password', message: 'Incorrect password' }
}

class UserController {

  static get inject () {
    return ['App/Model/User', 'App/Model/TimeEntry', 'Validator', 'Hash'] 
  }

  constructor (User, TimeEntry, Validator, Hash) { 
    this.User = User
    this.TimeEntry = TimeEntry
    this.Validator = Validator
    this.Hash = Hash
  }

  * index(request, response) {
    // Todo require auth & manager | admin permissions
    response.ok(yield this.User.all())
  }

  * store(request, response) {
    var body = request.only('username', 'email', 'password')

    const validation = yield this.Validator.validate(body, this.User.rules, this.User.messages)

    if (validation.fails()) {
      response.unauthorized({ errors: validation.messages() })
      return
    }

    body.password = yield this.Hash.make(body.password)
    var user = yield this.User.create(body)

    try {
      var email = request.input('email'), password = request.input('password')
      response.ok({token: yield request.auth.attempt(email, password)})
    } catch (e) {
      response.unauthorized({ error: Auth_Errors[e.name] })
    }
  }

  * login(request, response) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      response.ok({token: yield request.auth.attempt(email, password)})
    } catch (e) {
      response.unauthorized({ error: Auth_Errors[e.name] })
    }
  }

  // TODO split this up into two methods
  * profile(request, response) {
    const user = yield request.auth.getUser()
    if (user) {
      response.ok({ profile: user })
      return
    }
    response.unauthorized('You must login to view your profile')
  }

  * times(request, response) {
    const user = yield request.auth.getUser()
    if (user) {
      var timeEntries = yield user.timeEntries().orderBy('date', 'desc').fetch()

      response.ok({ timeEntries })
      return
    }
    response.unauthorized('You must login to view your times')
  }

  * report(request, response) {
    const user = yield request.auth.getUser()
    if (user) {
      var timeEntries = yield user.timeEntries().orderBy('date', 'desc').fetch()
      var report = _.groupBy(timeEntries.toJSON(), (entry) => {
        var startOfWeek = moment(entry.date, 'DD/MM/YYYY').startOf('isoWeek')
        return Antl.formatDate(new Date(startOfWeek), {
          weekday: 'short',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      })

      response.ok({ report })
      return
    }
    response.unauthorized('You must login to view your report')
  }

  * show(request, response) {
    // Todo require auth & manager | admin permissions
    yield response.json({ message: 'Not implemented yet! (show)' })
  }

  * edit(request, response) {
    // Todo require auth & manager | admin permissions
    yield response.json({ message: 'Not implemented yet! (edit)' })
  }

  * update(request, response) {
    // Todo require auth & manager | admin permissions
    yield response.json({ message: 'Not implemented yet! (update)' })
  }

  * destroy(request, response) {
    // Todo require auth & manager | admin permissions
    yield response.json({ message: 'Not implemented yet! (destroy)' })
  }

}

module.exports = UserController
