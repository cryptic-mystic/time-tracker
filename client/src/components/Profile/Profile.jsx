import React from 'react'

import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import FontIcon from 'material-ui/FontIcon'

import DeleteTimeDialog from '../DeleteTimeDialog'
import UpdateTimeDialog from '../UpdateTimeDialog'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          loading: true,
          deleteConfirmOpen: false,
          updateDialogOpen: false,
          selected: null
        }

        this.logout = this.logout.bind(this)
        this.renderTimes = this.renderTimes.bind(this)
        this.renderProfile = this.renderProfile.bind(this)
    }

    componentWillMount() {
      var self = this

      this.props.getProfile()
    }

    componentWillUpdate(nextProps, nextState) {
      let { profile, entries } = nextProps,
        { loading } = nextState

      if (profile != null && entries != null && loading) this.setState({ loading: false })
    }

    logout() {
      this.props.logout()
      this.props.router.push('/')
    }

    renderProfile() {
      let { classes, sheet, profile, entries } = this.props,
        usernameDisplay = profile ? profile.username : 'N/A',
        emailDisplay = profile ? profile.email : 'N/A',
        iconClass = 'icon-user'

      if (profile && profile.role === 'admin') {
        usernameDisplay = `${usernameDisplay} (Admin)`
        iconClass = 'icon-user-tie'
      } else if (profile && profile.role === 'manager') {
        usernameDisplay = `${usernameDisplay} (Manager)`
        iconClass = 'icon-users'
      }

      return <Card className={classes.profileCard}>
        <CardHeader
          title={usernameDisplay}
          subtitle={emailDisplay}
          avatar={<FontIcon className={iconClass} />}
          className={classes.profileCardHeader} 
        />
        <CardText>
          {this.renderTimes()}
        </CardText>
      </Card>
    }

    renderTimes() {
      let { classes, sheet, profile, entries } = this.props,
        { selected } = this.state,
        isSelected = selected !== null,
        self = this

      return entries && entries.length ? <div>
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
          </div>
          <Table onCellClick={(row, col) => 
            self.setState({ selected: selected === row ? null : row })}
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>Distance</TableHeaderColumn>
                <TableHeaderColumn>Time</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody deselectOnClickaway={false}>
              {this.props.entries.map((entry, i) => 
                <TableRow key={i}>
                  <TableRowColumn>{entry.date_display}</TableRowColumn>
                  <TableRowColumn>{entry.distance} miles</TableRowColumn>
                  <TableRowColumn>{entry.time}</TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table> 
        </div>
        :
        <div>No time records have been recorded yet. Go track!</div>
    }

    render() {
        let { classes, sheet, profile, entries } = this.props,
          { deleteConfirmOpen, selected, updateDialogOpen } = this.state,
          selectedEntry = entries && entries.length && selected !== null ? entries[selected] : null,
          self = this

        return <Paper className={classes.profile} zDepth={2}>
          <h2>Profile</h2>

          <div className={classes.content}>
            {this.state.loading ? <CircularProgress
              color='#ff4081'
              size={80}
              thickness={8}
            /> : this.renderProfile() }
          </div>

          <DeleteTimeDialog
            recordToDelete={selectedEntry}
            open={deleteConfirmOpen}
            onRequestClose={() => self.setState({ deleteConfirmOpen: false })}
          />

          <UpdateTimeDialog
            recordToUpdate={selectedEntry}
            open={updateDialogOpen}
            onRequestClose={() => self.setState({ updateDialogOpen: false })}
          />

          <RaisedButton primary={true} label="Logout" onTouchTap={this.logout}/>
        </Paper>
    }
}
