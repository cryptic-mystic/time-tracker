'use strict'

const Lucid = use('Lucid')

class TimeEntry extends Lucid {
  user() {
    return this.belongsTo('App/Model/User')
  }

  static get rules() { 
    return {
      date: 'required',
      // date: 'required|date_format:YYYY-MM-DD',
      // date: 'required|date',
      time: 'required',
      // username: ['regex:^[a-zA-z]+$']
      distance: 'required|integer',
      user_id: 'required|integer'
    }
  }

  static get messages() { 
    return {
      'date.required': 'A valid is date required',
      'time.required': 'A valid is time required',
      'distance.required': 'A valid is distance required',
      'user_id.required': 'A valid is user_id required'
    }
  }
}

module.exports = TimeEntry
