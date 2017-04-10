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

    var body = request.only('date', 'time', 'distance')
    body.user_id = user.id

    const validation = yield this.Validator.validate(body, this.TimeEntry.rules, this.TimeEntry.messages)

    if (validation.fails()) {
      response.badRequest({ errors: validation.messages() })
      return
    }

    response.ok(yield this.TimeEntry.create(body))
  }

  * show(request, response) {
    // require login
    // require time entry to belong to user, or admin permissions
  }

  * edit(request, response) {
    // require login
    // require time entry to belong to user, or admin permissions
  }

  * update(request, response) {
    const user = yield request.auth.getUser()
    if (!user) {
      response.unauthorized('You must login to perform this action')
      return
    }

    var body = request.only('id', 'date', 'time', 'distance')

    response.ok()
  }

  * destroy(request, response) {
    const user = yield request.auth.getUser()
    if (!user) {
      response.unauthorized('You must login to perform this action')
      return
    }

    var id = request.param('id'),
      timeEntry = yield this.TimeEntry.find(id)

    if (timeEntry && timeEntry.user_id === user.id) {
      response.ok(yield timeEntry.delete())
      return
    } else {
      response.unauthorized('Cannot delete this resource')
      return
    }
  }

}

module.exports = TimeController
