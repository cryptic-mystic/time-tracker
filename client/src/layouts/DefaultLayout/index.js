import React from 'react'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectSheet from 'react-jss'

const muiTheme = getMuiTheme({
  fontFamily: "'Montserrat', sans-serif"
})

const styles = {
    '@global': {
        '*': {
            fontFamily: "'Montserrat', sans-serif"
        }
    }
}

class DefaultLayout extends React.Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        let { classes, sheet, children } = this.props

        return <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                {children}
            </div>
        </MuiThemeProvider>
    }
}

export default injectSheet(styles)(DefaultLayout)