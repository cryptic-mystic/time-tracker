import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import TimeForm from '../TimeForm'

export default class CreateTimeDialog extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
    onCreate: React.PropTypes.func
  }

  constructor(props) {
    super(props)

    this.create = this.create.bind(this)
  }

  create(time, distance, date) {
    let { createTime, snackbarMessage, onRequestClose, onCreate, user } = this.props

    if (typeof user === 'undefined' || user === null)
      throw 'You need a user to create this time for'

    createTime(date, time, distance, user.id)
      .then(function (success) {
        onRequestClose()
        snackbarMessage('Time created')
        if (onCreate) onCreate()
      })
      .catch(function (failure) {
        snackbarMessage('ERROR: Couldn\'t create time, please try again')
      })
  }

  render() {
    let { classes, sheet, open, onRequestClose } = this.props

    return <Dialog
      title="Create Record"
      actions={[
        <FlatButton
          label="Cancel"
          onTouchTap={onRequestClose}
        />
      ]}
      open={open}
      onRequestClose={onRequestClose}
      className={classes.createDialog}
    >
      <TimeForm onSave={this.create} />
    </Dialog>
  }
}