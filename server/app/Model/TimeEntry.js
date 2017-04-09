'use strict'

const Lucid = use('Lucid')

class TimeEntry extends Lucid {
  user() {
    return this.belongsTo('App/Model/User')
  }

  static get rules() { 
    return {
      date: 'required|date_format:YYYY-MM-DD',
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
