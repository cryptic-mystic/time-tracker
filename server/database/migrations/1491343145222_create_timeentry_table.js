'use strict'

const Schema = use('Schema')

class TimeEntriesTableSchema extends Schema {

  up () {
    this.create('time_entries', (table) => {
      table.date('date')
      table.string('time')
      table.decimal('distance')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('id').inTable('users')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('time_entries')
  }

}

module.exports = TimeEntriesTableSchema
