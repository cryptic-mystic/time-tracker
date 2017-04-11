import DefaultLayout from './DefaultLayout'

import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { snackbarHide } from '../../store/snackbar/actions'

import stylesheet from './style.css'

const styles = {
    '@global': {
        '*': {
            fontFamily: "'Montserrat', sans-serif"
        },
        '.clearfix': {
            '&::after': {
                'visibility': 'hidden',
                'display': 'block',
                'font-size': '0',
                'content': '\'\'',
                'clear': 'both',
                'height': '0'
            }
        }
    },
    navigation: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100
    },
    content: {
        marginBottom: '70px',
        position: 'absolute',
        left: '10px',
        right: '10px'
    }
}

export default withRouter(injectSheet(styles)(
    connect((state) => {
        var role = state.user.getIn(['profile', 'role'])

        return {
            snackbar: state.snackbar.toJS(),
            authenticated: state.user.get('authenticated'),
            isManager: role === 'admin' || role === 'manager'
        }
    }, { snackbarHide })(DefaultLayout)
))