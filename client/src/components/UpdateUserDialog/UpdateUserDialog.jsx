import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class UpdateUserDialog extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    updateUser: React.PropTypes.func.isRequired,
    snackbarMessage: React.PropTypes.func.isRequired,
    user: React.PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      username: {
        value: props.user ? props.user.username : '',
        error: undefined
      },
      email: {
        value: props.user ? props.user.email : '',
        error: undefined
      },
      role: {
        value: props.user ? props.user.role : 'member',
        error: undefined
      }
    }

    this.update = this.update.bind(this)
    this.isValid = this.isValid.bind(this)
  }

  componentWillUpdate(nextProps, nextState) {
    let { user } = nextProps,
      { username, email, role } = this.state

    // Nothing has changed
    if (this.props.user !== null && user !== null && this.props.user.id === user.id) return
    else if (this.props.user === null && user === null) return
    
    // User has been erased or changed
    this.setState({
      username: { value: user ? user.username : '' },
      email: { value: user ? user.email : '' },
      role: { value: user ? user.role : '' }
    })
  }

  isValid() {
    let { username, email, role } = this.state
    
    return typeof username.error === 'undefined' &&
      typeof email.error === 'undefined' &&
      typeof role.error === 'undefined' &&
      username.value !== '' && email.value !== '' && role.value !== ''
  }

  update() {
    let { updateUser, snackbarMessage, onRequestClose, user } = this.props,
      { username, email, role } = this.state,
      updates = {},
      self = this

    if (user.username !== username.value) updates.username = username.value
    if (user.email !== email.value) updates.email = email.value
    if (user.role !== role.value) updates.role = role.value

    updateUser(user.id, updates).then(function (success) {
        onRequestClose()
        snackbarMessage('User updated')
      })
      .catch(function (error) {
        if (error.field) {
          self.setState({
            [`${error.field}`]: {
                value: self.state[`${error.field}`].value,
                error: error.message
            }
          })
        }
        snackbarMessage('ERROR: Couldn\'t update user, please try again')
      })
  }

  render() {
    let { classes, sheet, open, onRequestClose, user } = this.props,
      { username, email, role } = this.state,
      self = this

    return <Dialog
      title="Update User"
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
      {user 
        ? <div>
          <TextField
            floatingLabelText="Username"
            value={username.value}
            name='username'
            errorText={username.error}
            onChange={(event) => self.setState({
              username: { value: event.target.value }
            })}
          /><br />
          <TextField
            floatingLabelText="Email"
            value={email.value}
            name='email'
            errorText={email.error}
            onChange={(event) => self.setState({
              email: { value: event.target.value }
            })}
          /><br />
          <SelectField
            className={classes.roleSelect}
            floatingLabelText="Role"
            value={role.value}
            errorText={role.error}
            onChange={(event, key, value) => self.setState({
              role: { value }
            })}
          >
            <MenuItem value={'member'} primaryText="Member" />
            <MenuItem value={'manager'} primaryText="Manager" />
            <MenuItem value={'admin'} primaryText="Admin" />
          </SelectField><br />

          <RaisedButton primary={true} disabled={!this.isValid()} label="Save"
            onTouchTap={this.update}
          />
        </div>
        : 'Please select a user to update'
      }
    </Dialog>
  }
}