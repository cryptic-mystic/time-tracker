import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import TimeForm from '../TimeForm'

export default class UpdateTimeDialog extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    recordToUpdate: React.PropTypes.object
  }

  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
  }

  update(time, distance, date) {
    let { updateTime, snackbarMessage, onRequestClose, recordToUpdate } = this.props

    updateTime(recordToUpdate.id, date, time, distance)
      .then(function (success) {
        onRequestClose()
        snackbarMessage('Time updated')
      })
      .catch(function (failure) {
        snackbarMessage('ERROR: Couldn\'t update time, please try again')
      })
  }

  render() {
    let { classes, sheet, open, onRequestClose, recordToUpdate } = this.props

    return <Dialog
      title="Update Record"
      actions={[
        <FlatButton
          label="Cancel"
          onTouchTap={onRequestClose}
        />
      ]}
      open={open}
      onRequestClose={onRequestClose}
      className={classes.updateDialog}
    >
      {recordToUpdate 
        ? <TimeForm onSave={this.update} record={recordToUpdate} />
        : 'Please select a record to update'
      }
    </Dialog>
  }
}