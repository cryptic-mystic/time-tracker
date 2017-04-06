import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import Track from './Track'

const styles = {
  track: {
    padding: '40px 60px',
    textAlign: 'center',
    '& h1': {
      textAlign: 'center',
      margin: '0 0 20px'
    }
  },
  button: {
    margin: '10px 0'
  }
}

export default injectSheet(styles)(
  connect((state) => {
      return {}
  }, {})(Track)
)
