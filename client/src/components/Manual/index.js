import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import Manual from './Manual'

const styles = {
  manual: {
    marginTop: '20px'
  },
  slider: {
    display: 'inline-block',
    margin: '0 20px'
  },
  labels: {
    marginTop: '20px',
    '& h4': {
      display: 'inline-block',
      margin: 0,
      width: '58px'
    }
  },
  time: {
    marginTop: '60px'
  },
  distance: {
    display: 'block !important',
    margin: '0 auto 20px !important'
  }
}

export default injectSheet(styles)(
  connect((state) => {
      return {}
  }, {})(Manual)
)
