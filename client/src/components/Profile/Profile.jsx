import React from 'react'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this)
    }

    logout() {
      this.props.logout()
      this.props.router.push('/')
    }

    render() {
        let { classes, sheet, logout } = this.props

        return <Paper className={classes.profile} zDepth={2}>
          <h2>Profile</h2>

          <RaisedButton primary={true} label="Logout" onTouchTap={this.logout}/>
        </Paper>
    }
}
