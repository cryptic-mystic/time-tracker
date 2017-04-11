import React from 'react'

import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'

import { formatDigits, dateString } from '../../utils/helpers'

export default class TimeForm extends React.Component {
  static propTypes = {
    onSave: React.PropTypes.func.isRequired,
    record: React.PropTypes.object
  }

  constructor(props) {
    super(props)

    var record = props.record,
      hasTime = typeof record !== 'undefined' && record !== null,
      timeArray = hasTime ? record.time.split(':') : undefined

    this.state = {
      milliseconds: hasTime ? parseInt(timeArray[3]) : 0,
      seconds: hasTime ? parseInt(timeArray[2]) : 0,
      minutes: hasTime ? parseInt(timeArray[1]) : 0,
      hours: hasTime ? parseInt(timeArray[0]) : 0,
      distance: {
        value: hasTime ? record.distance : '',
        error: undefined
      },
      date: hasTime ? new Date(record.date) : null
    }

    this.isValid = this.isValid.bind(this)
    this.timeString = this.timeString.bind(this)
  }

  isValid() {
    let { milliseconds, seconds, minutes, hours, distance, date } = this.state

    return typeof distance.error === 'undefined' && distance.value !== '' && date !== null
  }

  timeString() {
    let { milliseconds, seconds, minutes, hours } = this.state

    return `${formatDigits(hours, 2)}:${formatDigits(minutes, 2)}:${formatDigits(seconds, 2)}:${formatDigits(milliseconds, 3)}`
  }

  render() {
      let { classes, sheet, onSave } = this.props,
        { milliseconds, seconds, minutes, hours, distance, date } = this.state,
        self = this

      return <div className={classes.manual}>
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
        <h2 className={classes.time}>{this.timeString()}</h2>

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
          onTouchTap={() => onSave(this.timeString(), distance.value, dateString(date))}
        />
      </div>
  }
}