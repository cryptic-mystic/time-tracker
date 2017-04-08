'use strict'

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
      response.ok({ errors: validation.messages() })
      return
    }

    body.password = yield this.Hash.make(body.password)
    var user = yield this.User.create(body)

    try {
      var email = request.input('email'), password = request.input('password')
      response.ok({token: yield request.auth.attempt(email, password)})
    } catch (e) {
      response.unauthorized({error: e.message})
    }
  }

  * login(request, response) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      response.ok({token: yield request.auth.attempt(email, password)})
    } catch (e) {
      response.unauthorized({error: e.message})
    }
  }

  * profile(request, response) {
    // Todo pull record of user times
    const user = yield request.auth.getUser()
    if (user) {
      response.ok(user)
      return
    }
    response.unauthorized('You must login to view your profile')
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
