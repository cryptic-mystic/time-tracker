'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')
const Hash = use('Hash')

class UserController {

  * index(request, response) {
    response.ok(yield User.all())
  }

  * store(request, response) {
    var body = request.only('username', 'email', 'password')

    const validation = yield Validator.validate(body, User.rules, User.messages)

    if (validation.fails()) {
      response.ok({ errors: validation.messages() })
      return
    }

    body.password = yield Hash.make(body.password)
    var user = yield User.create(body)

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
    const user = yield request.auth.getUser()
    if (user) {
      response.ok(user)
      return
    }
    response.unauthorized('You must login to view your profile')
  }

  * show(request, response) {
    yield response.json({ message: 'Not implemented yet! (show)' })
  }

  * edit(request, response) {
    yield response.json({ message: 'Not implemented yet! (edit)' })
  }

  * update(request, response) {
    yield response.json({ message: 'Not implemented yet! (update)' })
  }

  * destroy(request, response) {
    yield response.json({ message: 'Not implemented yet! (destroy)' })
  }

}

module.exports = UserController
