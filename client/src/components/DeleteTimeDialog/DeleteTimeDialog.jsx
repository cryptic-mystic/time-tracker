import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class DeleteTimeDialog extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    recordToDelete: React.PropTypes.object
  }

  constructor(props) {
    super(props)

    this.delete = this.delete.bind(this)
  }

  delete() {
    let { deleteTime, snackbarMessage, recordToDelete, onRequestClose } = this.props,
      self = this

    deleteTime(recordToDelete.id)
      .then(function(success) {
        onRequestClose()
        snackbarMessage('Record deleted')
      })
      .catch(function(failure) {
        snackbarMessage('ERROR DELETING RECORD, please try again')
      })
  }

  render() {
    let { deleteTime, snackbarMessage, recordToDelete, open, onRequestClose } = this.props,
      self = this

    return <Dialog
      title="Confirm Record Delete"
      actions={[
        <FlatButton
          label="Cancel"
          onTouchTap={onRequestClose}
        />,
        <FlatButton
          label="Delete"
          secondary={true}
          onTouchTap={this.delete}
        />
      ]}
      open={open}
      onRequestClose={onRequestClose}
    >
      {recordToDelete 
        ? <div>
          <div>Delete this entry?</div>
          <div><b>Date:</b> {recordToDelete.date_display}</div>
          <div><b>Time:</b> {recordToDelete.time}</div>
          <div><b>Distance:</b> {recordToDelete.distance} miles</div>
        </div>
        : 'Please select a record to delete'
      }
    </Dialog>
  }
}