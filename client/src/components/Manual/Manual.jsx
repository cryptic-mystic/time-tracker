import React from 'react'

import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'

export default class Manual extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          milliseconds: 0,
          seconds: 0,
          minutes: 0,
          hours: 0
        }

        this.twoDigits = this.twoDigits.bind(this)
    }

    twoDigits(value) {
      var str = value + ''

      if (str.length < 2) return `0${str}`
      else if (str.length > 2) return str.substring(0, 2)
      else return str
    }

    render() {
        let { classes, sheet } = this.props,
          { milliseconds, seconds, minutes, hours } = this.state,
          self = this

        return <div className={classes.manual}>
          <h1>Manual Entry</h1>
          <DatePicker hintText="Date" />

          <div className={classes.labels}>
            <h4>H</h4><h4>M</h4><h4>S</h4><h4>MS</h4>
          </div>
          <Slider className={classes.slider} style={{height: 100}} axis="y" defaultValue={0} step={1} min={0} max={24} onChange={(event, newValue) => self.setState({ hours: newValue }) } value={hours} />
          <Slider className={classes.slider} style={{height: 100}} axis="y" defaultValue={0} step={1} min={0} max={59} onChange={(event, newValue) => self.setState({ minutes: newValue }) } value={minutes} />
          <Slider className={classes.slider} style={{height: 100}} axis="y" defaultValue={0} step={1} min={0} max={59} onChange={(event, newValue) => self.setState({ seconds: newValue }) } value={seconds} />
          <Slider className={classes.slider} style={{height: 100}} axis="y" defaultValue={0} step={1} min={0} max={999} onChange={(event, newValue) => self.setState({ milliseconds: newValue }) } value={milliseconds} />
          <h2 className={classes.time}>{this.twoDigits(hours)}:{this.twoDigits(minutes)}:{this.twoDigits(seconds)}:{this.twoDigits(milliseconds)}</h2>

          <RaisedButton primary={true} label="Save" />
        </div>
    }
}
