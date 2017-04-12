import UserWeeklyReport from './UserWeeklyReport'

import { connect } from 'react-redux'
import injectSheet from 'react-jss'

const styles = {
  loading: {
    textAlign: 'center',
  }
}

export default injectSheet(styles)(UserWeeklyReport)