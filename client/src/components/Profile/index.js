import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import LandingPage from './LandingPage'

const styles = {
  landing: {
    padding: '10px',
    '& h2': {
      textAlign: 'center',
      margin: '20px 0'
    }
  },
  button: {
    margin: '10px 0'
  }
}

export default injectSheet(styles)(
  connect((state) => {
      return {}
  }, {})(LandingPage)
)
