import React from 'react'

import TimeForm from '../TimeForm'

export default class Manual extends React.Component {
    static propTypes = {
        confirmTrack: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        let { classes, sheet, confirmTrack } = this.props

        return <div className={classes.manual}>
          <h1>Manual Time Entry</h1>
          <TimeForm onSave={confirmTrack} />
        </div>
    }
}
