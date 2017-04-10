import React from 'react'

import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import FontIcon from 'material-ui/FontIcon'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          loading: true,
          selected: null
        }

        this.logout = this.logout.bind(this)
        this.renderTimes = this.renderTimes.bind(this)
        this.renderProfile = this.renderProfile.bind(this)
        this.delete = this.delete.bind(this)
        this.update = this.update.bind(this)
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
            <RaisedButton disabled={!isSelected} label="Update" onTouchTap={this.update}/>
            <RaisedButton disabled={!isSelected} secondary={true} label="Delete" onTouchTap={this.delete}/>
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

    delete() {
      let { deleteTime } = this.props,
        { selected } = this.state

      console.log(`Selected: ${selected}`)
      // pop up confirm modal
    }

    update() {
      let { updateTime } = this.props,
        { selected } = this.state

      console.log(`Selected: ${selected}`)
      // pop up update modal
    }

    render() {
        let { classes, sheet, profile, entries } = this.props

        return <Paper className={classes.profile} zDepth={2}>
          <h2>Profile</h2>

          <div className={classes.content}>
            {this.state.loading ? <CircularProgress
              color='#ff4081'
              size={80}
              thickness={8}
            /> : this.renderProfile() }
          </div>

          <RaisedButton primary={true} label="Logout" onTouchTap={this.logout}/>
        </Paper>
    }
}
