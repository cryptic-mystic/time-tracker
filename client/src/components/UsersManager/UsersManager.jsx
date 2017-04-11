import React from 'react'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import DeleteUserDialog from '../DeleteUserDialog'
import UpdateUserDialog from '../UpdateUserDialog'

import { capitalize } from '../../utils/helpers'

export default class UsersManager extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      updateDialogOpen: false,
      deleteConfirmOpen: false,
      selected: null
    }
  }

  componentWillMount() {
    this.props.getUsers()
  }

  componentDidUpdate() {
    let { users } = this.props,
      { loading } = this.state

    if (users != null && loading) this.setState({ loading: false })
  }

  render() {
    let { classes, sheet, users } = this.props,
      { loading, selected, deleteConfirmOpen, updateDialogOpen } = this.state,
      isSelected = selected !== null,
      selectedUser = users && users.length && isSelected ? users[selected] : null,
      self = this

    return <Paper className={classes.manager} zDepth={2}>
      <h2>Manage Users</h2>

      {loading ? <div className={classes.loading}>
          <CircularProgress color='#ff4081' size={80} thickness={8} />
        </div>
        :
        <div>
          <div className={classes.controls}>
            <RaisedButton disabled={!isSelected}
              label="Update"
              onTouchTap={() => self.setState({ updateDialogOpen: true })}
            />
            <RaisedButton disabled={!isSelected}
              secondary={true}
              label="Delete"
              onTouchTap={() => self.setState({ deleteConfirmOpen: true })}
            />
            {/*TODO View Profile*/}
          </div>
          <Table onCellClick={(row, col) => self.setState({ selected: selected === row ? null : row })}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Username</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Role</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody deselectOnClickaway={false}>
              {users.map((user, i) => 
                <TableRow key={i}>
                  <TableRowColumn>{user.username}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  <TableRowColumn>{capitalize(user.role)}</TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <DeleteUserDialog
            user={selectedUser}
            open={deleteConfirmOpen}
            onRequestClose={() => self.setState({deleteConfirmOpen: false})}
          />
          <UpdateUserDialog
            user={selectedUser}
            open={updateDialogOpen}
            onRequestClose={() => self.setState({updateDialogOpen: false})}
          />
        </div>
      }

    </Paper>
  }
}