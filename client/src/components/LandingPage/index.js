import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { withRouter } from 'react-router'

import LandingPage from './LandingPage'

const styles = {
  landing: {
    padding: '40px 60px',
    textAlign: 'center',
    '& h1, h2, h3, h4': {
      textAlign: 'center',
      margin: '0 0 20px'
    }
  },
  button: {
    margin: '10px 0'
  }
}

export default withRouter(injectSheet(styles)(
  connect((state) => {
      return {
        authenticated: state.user.get('authenticated')
      }
  }, {})(LandingPage)
))