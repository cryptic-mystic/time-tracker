'use strict'

class TimeController {

  static get inject () {
    return ['App/Model/User', 'App/Model/TimeEntry']
  }

  constructor (User, TimeEntry) { 
    this.User = User
    this.TimeEntry = TimeEntry
  }

  * store(request, response) {
    // require login
    // create new time entry for user
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
