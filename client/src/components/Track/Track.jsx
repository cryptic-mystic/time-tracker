import React from 'react'

import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'

import Record from '../Record'
import Manual from '../Manual'

export default class Track extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          modeToggle: true
        }
    }

    render() {
        let { classes, sheet } = this.props,
          { modeToggle } = this.state,
          self = this

        return <Paper className={classes.track} zDepth={2}>
          <Tabs>
            <Tab
              icon={<FontIcon className="icon-stopwatch"></FontIcon>}
              label="Record"
              onActive={() => self.setState({ modeToggle: true })}
            />
            <Tab
              icon={<FontIcon className="icon-calendar"></FontIcon>}
              label="Manual"
              onActive={() => self.setState({ modeToggle: false })}
            />
          </Tabs>
          {modeToggle ? <Record /> : <Manual />}
        </Paper>
    }
}
