import React from 'react'
import FontIcon from 'material-ui/FontIcon'

import { Link } from 'react-router'

export default class Logo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { classes, sheet } = this.props

    return <Link className={classes.logo} to='/'>
      <FontIcon
        className="icon-stopwatch"
      />
      <h1>Time Tracker</h1>
    </Link>
  }
}