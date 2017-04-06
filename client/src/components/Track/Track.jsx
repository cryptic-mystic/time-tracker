import React from 'react'
import uuidV4 from 'uuid/v4'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

export default class Track extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { classes, sheet } = this.props

        return <Paper className={classes.track} zDepth={2}>
          <h1>Time to Track!</h1>
        </Paper>
    }
}
