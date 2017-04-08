import React from 'react'

import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'

export default class Manual extends React.Component {
    static propTypes = {
        confirmTrack: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
          milliseconds: 0,
          seconds: 0,
          minutes: 0,
          hours: 0,
          distance: {
            value: '',
            error: undefined
          },
          date: null
        }

        this.twoDigits = this.twoDigits.bind(this)
    }

    isValid() {
      let { milliseconds, seconds, minutes, hours, distance, date } = this.state

      return typeof distance.error === 'undefined' && distance.value !== '' && date !== null
    }

    twoDigits(value) {
      var str = value + ''

      if (str.length < 2) return `0${str}`
      else if (str.length > 2) return str.substring(0, 2)
      else return str
    }

    render() {
        let { classes, sheet, confirmTrack } = this.props,
          { milliseconds, seconds, minutes, hours, distance, date } = this.state,
          self = this

        return <div className={classes.manual}>
          <h1>Manual Time Entry</h1>
          <DatePicker hintText="Date"
            value={date}
            onChange={(none, newDate) => self.setState({date: newDate})}
          />

          <div className={classes.labels}>
            <h4>H</h4><h4>M</h4><h4>S</h4><h4>MS</h4>
          </div>
          <Slider className={classes.slider} style={{height: 100}} axis="y" defaultValue={0} step={1} min={0} max={24} onChange={(event, newValue) => self.setState({ hours: newValue }) } value={hours} />
          <Slider className={classes.slider} style={{height: 100}} axis="y" defaultValue={0} step={1} min={0} max={59} onChange={(event, newValue) => self.setState({ minutes: newValue }) } value={minutes} />
          <Slider className={classes.slider} style={{height: 100}} axis="y" defaultValue={0} step={1} min={0} max={59} onChange={(event, newValue) => self.setState({ seconds: newValue }) } value={seconds} />
          <Slider className={classes.slider} style={{height: 100}} axis="y" defaultValue={0} step={1} min={0} max={999} onChange={(event, newValue) => self.setState({ milliseconds: newValue }) } value={milliseconds} />
          <h2 className={classes.time}>{this.twoDigits(hours)}:{this.twoDigits(minutes)}:{this.twoDigits(seconds)}:{this.twoDigits(milliseconds)}</h2>

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

          <RaisedButton primary={true} label="Save"
            disabled={!this.isValid()}
            onTouchTap={() => confirmTrack(hours, minutes, seconds, milliseconds, distance.value, date)}
          />
        </div>
    }
}
