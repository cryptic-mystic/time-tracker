'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.group('version1', function () {
  Route.get('users/profile', 'UserController.profile')
  Route.get('users/times', 'UserController.times')
  Route.get('users/report', 'UserController.report')
  Route.post('users/login', 'UserController.login')
  Route.resource('users', 'UserController')

  Route.resource('time', 'TimeController')
}).prefix('api/v1')
