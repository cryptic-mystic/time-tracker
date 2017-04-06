import React from 'react'
import uuidV4 from 'uuid/v4'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        let { authenticated, router } = this.props

        if (authenticated) router.push('/track')
    }

    render() {
        let { classes, sheet, router } = this.props

        return <Paper className={classes.landing} zDepth={2}>
          <h1>Time Tracker</h1>
          <RaisedButton className={classes.button}
            label="Sign In"
            primary={true}
            fullWidth={true}
            onTouchTap={() => router.push('/signin')}
          />
          <RaisedButton className={classes.button}
            label="Sign Up"
            secondary={true}
            fullWidth={true}
            onTouchTap={() => router.push('/signup')}
          />
        </Paper>
    }
}
