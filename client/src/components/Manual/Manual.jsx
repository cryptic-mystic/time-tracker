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
          <h2>Manual Time Entry</h2>
          <TimeForm onSave={confirmTrack} />
        </div>
    }
}
