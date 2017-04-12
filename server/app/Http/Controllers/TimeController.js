'use strict'

class TimeController {

  static get inject () {
    return ['App/Model/User', 'App/Model/TimeEntry', 'Validator']
  }

  constructor (User, TimeEntry, Validator) { 
    this.User = User
    this.TimeEntry = TimeEntry
    this.Validator = Validator
  }

  * store(request, response) {
    const user = yield request.auth.getUser()
    if (!user) {
      response.unauthorized('You must login to perform this action')
      return
    }

    var body = request.only('date', 'time', 'distance', 'user_id')
    if (body.user_id && !user.isAdmin()) {
      response.unauthorized('You must be an administrator to create times for other users')
      return
    } else if (typeof body.user_id === 'undefined' || body.user_id === null) {
      console.log('creating time for this user')
      body.user_id = user.id
    } else {
      console.log('creating time for other user....')
    }

    const validation = yield this.Validator.validate(body, this.TimeEntry.rules, this.TimeEntry.messages)

    if (validation.fails()) {
      response.badRequest({ errors: validation.messages() })
      return
    }

    response.ok(yield this.TimeEntry.create(body))
  }

  * update(request, response) {
    const user = yield request.auth.getUser()
    if (!user) {
      response.unauthorized('You must login to perform this action')
      return
    }

    var id = request.param('id'),
      updates = request.only('date', 'time', 'distance'),
      timeEntry = yield this.TimeEntry.find(id)

    if (timeEntry && (timeEntry.user_id === user.id || user.isAdmin())) {
      timeEntry.fill(updates)
      const validation = yield this.Validator.validate(timeEntry, this.TimeEntry.rules, this.TimeEntry.messages)

      if (validation.fails()) {
        response.badRequest({ errors: validation.messages() })
        return
      }

      response.ok(yield timeEntry.save())
      return
    } else response.unauthorized('Cannot update this resource')
  }

  * destroy(request, response) {
    const user = yield request.auth.getUser()
    if (!user) {
      response.unauthorized('You must login to perform this action')
      return
    }

    var id = request.param('id'),
      timeEntry = yield this.TimeEntry.find(id)

    if (timeEntry && (timeEntry.user_id === user.id || user.isAdmin()))
      response.ok(yield timeEntry.delete())
    else response.unauthorized('Cannot delete this resource')
  }

}

module.exports = TimeController
