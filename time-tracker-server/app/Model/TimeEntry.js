'use strict'

const Lucid = use('Lucid')

class TimeEntry extends Lucid {
  user() {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = TimeEntry
