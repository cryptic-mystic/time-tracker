import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import Track from './Track'

import { createTime } from '../../store/user/actions'

const styles = {
  track: {
    padding: '0 0 40px 0',
    textAlign: 'center',
    '& h1': {
      textAlign: 'center',
      margin: '0 0 20px'
    }
  },
  timer: {
    position: 'relative',
    height: '100px'
  },
  seconds: {
    position: 'absolute !important',
    top: '20px',
    left: '0',
    right: '0',
    margin: '0 auto'
  },
  minutes: {
    position: 'absolute !important',
    top: '10px',
    left: '0',
    right: '0',
    margin: '0 auto'
  },
  hours: {
    position: 'absolute !important',
    left: '0',
    right: '0',
    margin: '0 auto'
  }
}

export default injectSheet(styles)(
  connect((state) => {
      return {}
  }, { createTime })(Track)
)
