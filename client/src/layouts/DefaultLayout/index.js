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
        return {
            snackbar: state.snackbar.toJS(),
            authenticated: state.user.get('authenticated')
        }
    }, { snackbarHide })(DefaultLayout)
))