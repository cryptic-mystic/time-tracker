import React from 'react'
import uuidV4 from 'uuid/v4'

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { user, createUser, syncUser } = this.props

        return <div>
            Landing page!
        </div>
    }
}
