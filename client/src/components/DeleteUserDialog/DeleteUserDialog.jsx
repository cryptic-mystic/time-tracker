import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class DeleteUserDialog extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    deleteUser: React.PropTypes.func.isRequired,
    snackbarMessage: React.PropTypes.func.isRequired,
    user: React.PropTypes.object
  }

  constructor(props) {
    super(props)

    this.delete = this.delete.bind(this)
  }

  delete() {
    let { deleteUser, snackbarMessage, user, onRequestClose } = this.props

    deleteUser(user.id)
      .then(function(success) {
        onRequestClose()
        snackbarMessage('User deleted')
      })
      .catch(function(failure) {
        snackbarMessage('ERROR DELETING USER, please try again')
      })
  }

  render() {
    let { snackbarMessage, user, open, onRequestClose } = this.props,
      self = this

    return <Dialog
      title="Confirm User Delete"
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
      {user 
        ? `Delete user ${user.username}?`
        : 'Please select a user to delete'
      }
    </Dialog>
  }
}