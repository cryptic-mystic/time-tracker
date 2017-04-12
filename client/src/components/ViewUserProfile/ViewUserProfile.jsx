import React from 'react'

import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

import UserWeeklyReport from '../UserWeeklyReport'
import UserTimeEntriesTable from '../UserTimeEntriesTable'

export default class ViewUserProfile extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
  }

  componentWillMount() {
    this.update()
  }

  update(startDate, endDate) {
    let { params, viewProfile } = this.props,
      self = this

    viewProfile(params.id, startDate, endDate)
  }

  render() {
    let { classes, sheet, profile, report, timeEntries } = this.props,
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
      <h2>View Profile</h2>

      <div className={classes.content}>
        <Card className={classes.profileCard}>
          <CardHeader
            title={usernameDisplay}
            subtitle={emailDisplay}
            avatar={<FontIcon className={iconClass} />}
            className={classes.profileCardHeader} 
          />
          <CardText>
            <UserWeeklyReport report={report} />
            <UserTimeEntriesTable entries={timeEntries} updater={this.update} />
          </CardText>
        </Card>
      </div>
    </Paper>
  }
}