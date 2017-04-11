import React from 'react'

import Paper from 'material-ui/Paper'

export default class UsersManager extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props)
  }

  render() {
    let { classes, sheet } = this.props

    return <Paper className={classes.manager} zDepth={2}>
      <h2>Manage Users</h2>    
    </Paper>
  }
}