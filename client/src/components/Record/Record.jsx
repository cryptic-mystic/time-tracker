import React from 'react'

import FontIcon from 'material-ui/FontIcon'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'

export default class Record extends React.Component {
    static propTypes = {
        confirmTrack: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
          active: false,
          timerId: null,
          milliseconds: 0,
          seconds: 0,
          minutes: 0,
          hours: 0,
          distance: {
            value: '',
            error: undefined
          },
          date: new Date()
        }

        this.toggleTimer = this.toggleTimer.bind(this)
        this.increment = this.increment.bind(this)
        this.formatDigits = this.formatDigits.bind(this)
        this.timeString = this.timeString.bind(this)
        this.dateString = this.dateString.bind(this)
        this.isValid = this.isValid.bind(this)
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId)
    }

    formatDigits(value, digits) {
      var str = value + ''

      if (str.length < digits) return `${Array(digits - str.length + 1).join('0')}${str}`
      else if (str.length > digits) return str.substring(0, digits)
      else return str
    }

    timeString() {
      let { milliseconds, seconds, minutes, hours } = this.state

      return `${this.formatDigits(hours, 2)}:${this.formatDigits(minutes, 2)}:${this.formatDigits(seconds, 2)}:${this.formatDigits(milliseconds, 3)}`
    }

    dateString() {
      let { date } = this.state

      if (date === null) return ''

      return `${date.getFullYear()}-${this.formatDigits(date.getMonth()+1, 2)}-${this.formatDigits(date.getDate(), 2)}`
    }

    isValid() {
      let { milliseconds, seconds, minutes, hours, distance, active } = this.state

      return typeof distance.error === 'undefined' && distance.value !== '' && !active
    }

    toggleTimer() {
        var isActive = !this.state.active

        if (isActive) {
          this.setState({
            active: true,
            timerId: setInterval(this.increment, 10)
          })
        } else {
          clearInterval(this.state.timerId)
          this.setState({ active: false })
        }
    }

    increment() {
      let { milliseconds, seconds, minutes, hours } = this.state

      milliseconds+=10

      if (milliseconds === 1000) {
        milliseconds = 0
        seconds++
      }

      if (seconds === 60) {
        seconds = 0
        minutes++
      }

      if (minutes === 60) {
        minutes = 0
        hours++
      }

      this.setState({
        milliseconds: milliseconds,
        seconds: seconds,
        minutes: minutes,
        hours: hours
      })
    }

    twoDigits(value) {
      var str = value + ''

      if (str.length < 2) return `0${str}`
      else if (str.length > 2) return str.substring(0, 2)
      else return str
    }

    render() {
        let { classes, sheet, confirmTrack } = this.props,
          { active, seconds, minutes, hours, milliseconds, distance, date } = this.state,
          self = this

        return <div className={classes.record}>
          <h2>Timer</h2>
          <div className={classes.timer}>
            <CircularProgress mode="determinate"
              className={classes.seconds}
              color='#ff4081'
              size={80}
              thickness={8}
              value={seconds}
              min={0}
              max={60}
            />
            <CircularProgress mode="determinate"
              className={classes.minutes}
              color='#00B206'
              size={100}
              thickness={8}
              value={minutes}
              min={0}
              max={60}
            />
            <CircularProgress mode="determinate"
              className={classes.hours}
              color='#00bcd4'
              size={120}
              thickness={8}
              value={hours}
              min={0}
              max={24}
            />
            <FloatingActionButton className={classes.control} onTouchTap={this.toggleTimer}>
              {!active
                ? <FontIcon className="icon-play3" style={{ transition: 'none', position: 'relative', left: '3px' }} />
                : <FontIcon className="icon-pause2" style={{ transition: 'none', position: 'relative', left: '1px' }} />
              }
            </FloatingActionButton>
            <h2 className={classes.display}>{this.timeString()}</h2>
          </div>

          <TextField
            className={classes.distance}
            floatingLabelText="Distance (miles)"
            value={distance.value}
            name='distance'
            errorText={distance.error}
            onChange={(event) => {
              var raw = event.target.value

              if (/^[0-9]+(\.[0-9]+)?$/.test(raw)) self.setState({ distance: { value: raw, error: undefined } })
              else self.setState({ distance: { value: raw, error: 'Please enter a valid decimal' } })
            }}
          /><br />

          <RaisedButton primary={true} disabled={!this.isValid()} label="Save"
            onTouchTap={() => confirmTrack(this.timeString(), distance.value, this.dateString())}
          />
        </div>
    }
}
