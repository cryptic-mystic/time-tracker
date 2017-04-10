import React from 'react'

import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import Record from '../Record'
import Manual from '../Manual'

export default class Track extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          modeToggle: true,
          confirmOpen: false,
          loading: false,
          values: {}
        }

        this.confirmTrack = this.confirmTrack.bind(this)
        this.zeroPad = this.zeroPad.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    confirmTrack(hours, minutes, seconds, milliseconds, distance, date) {
      var month = this.zeroPad(date.getMonth()+1),
        day = this.zeroPad(date.getDate())

      this.setState({
        values: {
          time: `${hours}:${minutes}:${seconds}:${milliseconds}`,
          distance,
          date: `${date.getFullYear()}-${month}-${day}`
        },
        confirmOpen: true
      })
    }

    zeroPad(value) {
      return (value + '').length === 1 ? `0${value}` : value
    }

    handleClose(wasSubmitted) {
      let { createTime, snackbarMessage } = this.props,
        { date, time, distance } = this.state.values,
        self = this
      
      if (wasSubmitted) {
        self.setState({ loading: true })
        createTime(date, time, distance)
          .then(function (success) {
            snackbarMessage('Recorded time')
            self.setState({
              loading: false,
              confirmOpen: false,
              values: {}
            })
          })
          .catch(function (failure) {
            snackbarMessage('ERROR RECORDING TIME, please try again')
          })
        } else {
          self.setState({
            confirmOpen: false,
            values: {}
          })
        }
    }

    render() {
        let { classes, sheet } = this.props,
          { modeToggle, confirmOpen, values } = this.state,
          self = this

        const actions = [
          <FlatButton
            label="Cancel"
            onTouchTap={() => this.handleClose(false)}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={() => this.handleClose(true)}
          />,
        ];

        return <Paper className={classes.track} zDepth={2}>
          <Tabs>
            <Tab
              icon={<FontIcon className="icon-calendar"></FontIcon>}
              label="Record"
              onActive={() => self.setState({ modeToggle: true })}
            />
            <Tab
              icon={<FontIcon className="icon-stopwatch"></FontIcon>}
              label="Timer"
              onActive={() => self.setState({ modeToggle: false })}
            />
          </Tabs>
          {modeToggle ? <Manual confirmTrack={this.confirmTrack} /> : <Record confirmTrack={this.confirmTrack} />}
          <Dialog
            title="Confirm Time Entry"
            actions={actions}
            open={confirmOpen}
            onRequestClose={this.handleClose}
          >
            <div>
              <div>Save this entry?</div>
              <div><b>Date:</b> {values.date}</div>
              <div><b>Time:</b> {values.time}</div>
              <div><b>Distance:</b> {values.distance} miles</div>
            </div>
          </Dialog>
        </Paper>
    }
}
