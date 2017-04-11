import React from 'react'

import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

import TimeEntriesTable from '../TimeEntriesTable'
import WeeklyReport from '../WeeklyReport'

export default class Profile extends React.Component {
    constructor(props) {
      super(props)

      this.state = {}

      this.logout = this.logout.bind(this)
    }

    logout() {
      this.props.logout()
      this.props.router.push('/')
    }

    render() {
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

      return <Paper className={classes.profile} zDepth={2}>
        <h2>Profile</h2>

        <div className={classes.content}>
          <Card className={classes.profileCard}>
            <CardHeader
              title={usernameDisplay}
              subtitle={emailDisplay}
              avatar={<FontIcon className={iconClass} />}
              className={classes.profileCardHeader} 
            />
            <CardText>
              <WeeklyReport />
              <TimeEntriesTable />
            </CardText>
          </Card>
        </div>

        <RaisedButton primary={true} label="Logout" onTouchTap={this.logout}/>
      </Paper>
    }
}
