import React from 'react'
import uuidV4 from 'uuid/v4'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // todo: redirect to users' home if they are logged in
    }

    render() {
        let { classes, sheet } = this.props

        return <Paper className={classes.landing} zDepth={2}>
          <h2>Time Tracker</h2>
          <RaisedButton className={classes.button} label="Sign In" primary={true} fullWidth={true} />
          <RaisedButton className={classes.button} label="Sign Up" secondary={true} fullWidth={true} />
        </Paper>
    }
}
