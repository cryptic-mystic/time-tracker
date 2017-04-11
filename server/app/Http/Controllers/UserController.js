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
    const user = yield request.auth.getUser()
    if (user && user.isManager()) {
      response.ok(yield this.User.all())
      return
    }
    response.unauthorized('You must login as a manager to view users')
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
      var { startDate, endDate } = request.only('startDate', 'endDate'),
        query = user.timeEntries().orderBy('date', 'desc')

      if (startDate) query = query.where('date', '>=', startDate)
      if (endDate) query = query.where('date', '<=', endDate)

      response.ok({ timeEntries: yield query.fetch() })
      return
    }
    response.unauthorized('You must login to view your times')
  }

  * report(request, response) {
    const user = yield request.auth.getUser()
    if (user) {
      var timeEntries = yield user.timeEntries().orderBy('date', 'desc').fetch()
      var entriesByWeek = _.groupBy(timeEntries.toJSON(), (entry) => {
        var startOfWeek = moment(entry.date, 'DD/MM/YYYY').startOf('isoWeek')
        return moment(startOfWeek).format('MM/DD/YYYY')
      })

      var report = []
      for (var week in entriesByWeek) {
        if (entriesByWeek.hasOwnProperty(week)) {
          report.push({
            week: week,
            avg_pace: this.average(entriesByWeek[week].map((record) => record.pace)),
            avg_distance: this.average(entriesByWeek[week].map((record) => parseInt(record.distance)))
          })
        }
      }
      report = report.slice(0, 5)

      response.ok({ report })
      return
    }
    response.unauthorized('You must login to view your report')
  }

  average(array) {
    var sum = 0
    for(var i = 0; i < array.length; i++) sum+=array[i]
    return sum/array.length
  }

  * update(request, response) {
    const user = yield request.auth.getUser()
    if (!user) {
      response.unauthorized('You must login as a manager to update users')
      return
    }

    var id = request.param('id'),
      updates = request.only('username', 'email', 'role', 'password'),
      userToUpdate = yield this.User.find(id)

    if (userToUpdate && user.isManager()) {      
      const validation = yield this.Validator.validate(updates, this.User.update_rules, this.User.messages)

      if (validation.fails()) {
        response.badRequest({ errors: validation.messages() })
        return
      }

      userToUpdate.fill(updates)
      response.ok(yield userToUpdate.save())
      return
    } else response.unauthorized('Cannot update this user')
  }

  * destroy(request, response) {
    const user = yield request.auth.getUser()
    if (user && user.isManager()) {
      var id = request.param('id'),
        userToDelete = yield this.User.find(id)

      if (userToDelete) response.ok(yield userToDelete.delete())
      else response.unauthorized('Cannot delete this user')

      return
    }
    response.unauthorized('You must login as a manager to delete users')
  }

}

module.exports = UserController
