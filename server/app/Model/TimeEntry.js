'use strict'

const Lucid = use('Lucid')
const Antl = use('Antl')

class TimeEntry extends Lucid {
  user() {
    return this.belongsTo('App/Model/User')
  }

  static get computed () {
    return ['date_display', 'pace']
  }

  // static get visible () {
  //   return ['id', 'date', 'time', 'distance', 'user_id', 'date_display', 'avg_speed', 'created_at', 'updated_at']
  // }

  getPace() {
    var timeArray = this.time.split(':'),
      milliseconds = parseInt(timeArray[3]), seconds = parseInt(timeArray[2]),
      minutes = parseInt(timeArray[1]), hours = parseInt(timeArray[0]),
      decimalTime = (hours * 60) + minutes + (seconds/60) + (milliseconds/60/1000),
      pace = (decimalTime / this.distance) || 0

    return pace !== Infinity ? pace : 0
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
      'time.string': 'Time must be a string',
      'distance.required': 'A valid is distance required',
      'user_id.required': 'A valid is user_id required'
    }
  }
}

module.exports = TimeEntry
