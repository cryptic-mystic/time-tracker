'use strict'

const Lucid = use('Lucid')
const Antl = use('Antl')

class TimeEntry extends Lucid {
  user() {
    return this.belongsTo('App/Model/User')
  }

  static get computed () {
    return ['date_display']
  }

  getDateDisplay() {
    return Antl.formatDate(new Date(this.date), {
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  static get rules() { 
    return {
      date: 'required|date',
      time: 'required|string|timeentry',
      distance: 'required',
      user_id: 'required|integer'
    }
  }

  static get messages() { 
    return {
      'date.required': 'A valid is date required',
      'time.required': 'A valid is time required',
      'time.timeentry': 'Please provide a valid time format',
      'distance.required': 'A valid is distance required',
      'user_id.required': 'A valid is user_id required'
    }
  }
}

module.exports = TimeEntry
