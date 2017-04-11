import React from 'react'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Snackbar from 'material-ui/Snackbar'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import { TransitionMotion, spring } from 'react-motion'

import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
    fontFamily: "'Montserrat', sans-serif"
})

export default class DefaultLayout extends React.Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            navIndex: 0
        }

        this.willEnter = this.willEnter.bind(this)
        this.willLeave = this.willLeave.bind(this)
        this.renderChildren = this.renderChildren.bind(this)
        this.updateTab = this.updateTab.bind(this)
    }

    componentWillMount() {
        this.updateTab()
    }

    componentWillUpdate() {
        this.updateTab()
    }

    updateTab() {
        let { location } = this.props

        switch (location.pathname) {
            case '/profile':
                if (this.state.navIndex !== 1) this.setState({ navIndex: 1 })
                break
            case '/track':
            default:
                if (this.state.navIndex !== 0) this.setState({ navIndex: 0 })
                break
        }
    }

    willEnter(entering) {
        return {
            opacity: 0
        }
    }

    willLeave(leaving) {
        return {
            opacity: spring(0)
        }
    }

    renderChildren(config) {
        return <div key={config.key} className={this.props.classes.content} style={config.style}>
            {config.data}
        </div>
    }

    render() {
        let { classes, sheet, children, snackbar, snackbarHide, authenticated, router, location, isManager } = this.props,
            { navIndex } = this.state,
            pathname = location.pathname,
            self = this

        var navMenu = [
            <BottomNavigationItem key={0}
                label="Track"
                icon={<FontIcon className="icon-clock" />}
                onTouchTap={() => {
                    router.push('/track')
                    self.setState({ navIndex: 0 })
                }}
            />,
            <BottomNavigationItem key={1}
                label="Profile"
                icon={<FontIcon className="icon-user" />}
                onTouchTap={() => {
                    router.push('/profile')
                    self.setState({ navIndex: 1 })
                }}
            />
        ]

        if (isManager) {
            navMenu.push(<BottomNavigationItem key={2}
                label="Users"
                icon={<FontIcon className="icon-users" />}
                onTouchTap={() => {
                    router.push('/users')
                    self.setState({ navIndex: 2 })
                }}
            />)
        }

        return <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <TransitionMotion
                    styles={[{
                        key: `${pathname}-transition`,
                        data: children,
                        style: {
                            opacity: spring(1)
                        }
                    }]}
                    willEnter={this.willEnter}
                    willLeave={this.willLeave}
                >
                    {interpolated => 
                        <div>
                            {interpolated.map(this.renderChildren)}
                        </div>
                    }
                </TransitionMotion>

                {authenticated ? 
                  <Paper className={classes.navigation} zDepth={2}>
                    <BottomNavigation selectedIndex={navIndex}>
                      {navMenu}
                    </BottomNavigation>
                  </Paper>
                  : null
                }
                <Snackbar
                  open={snackbar.open}
                  message={snackbar.message}
                  autoHideDuration={4000}
                  onRequestClose={snackbarHide}
                />
            </div>
        </MuiThemeProvider>
    }
}