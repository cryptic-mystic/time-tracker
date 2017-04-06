'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.string('username').unique()
      table.string('email').unique()
      table.string('password', 60)
      table.enu('role', ['admin', 'manager', 'member']).defaultTo('member')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
