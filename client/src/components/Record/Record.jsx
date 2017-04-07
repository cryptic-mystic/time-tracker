import React from 'react'

import FontIcon from 'material-ui/FontIcon'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

export default class Record extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          active: false,
          timerId: null,
          milliseconds: 0,
          seconds: 0,
          minutes: 0,
          hours: 0
        }

        this.toggleTimer = this.toggleTimer.bind(this)
        this.increment = this.increment.bind(this)
        this.twoDigits = this.twoDigits.bind(this)
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId)
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
        let { classes, sheet } = this.props,
          { active, seconds, minutes, hours, milliseconds } = this.state,
          self = this

        return <div className={classes.record}>
          <h1>Record</h1>
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
            <h2 className={classes.display}>{this.twoDigits(hours)}:{this.twoDigits(minutes)}:{this.twoDigits(seconds)}:{this.twoDigits(milliseconds)}</h2>
          </div>

          <RaisedButton primary={true} disabled={active} label="Save" />
        </div>
    }
}
