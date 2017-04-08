import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import Record from './Record'

const styles = {
  record: {
    marginTop: '20px'
  },
  timer: {
    position: 'relative',
    height: '218px'
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
  },
  control: {
    position: 'relative',
    top: '32px',
    boxShadow: 'none !important'
  },
  display: {
    position: 'relative',
    top: '64px'
  },
  distance: {
    display: 'block !important',
    margin: '0 auto 20px !important'
  }
}

export default injectSheet(styles)(
  connect((state) => {
      return {}
  }, {})(Record)
)
