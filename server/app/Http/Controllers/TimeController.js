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
      response.ok({ errors: validation.messages() })
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
    // require login
    // require time entry to belong to user, or admin permissions
  }

  * destroy(request, response) {
    // require login
    // require time entry to belong to user, or admin permissions
  }

}

module.exports = TimeController
