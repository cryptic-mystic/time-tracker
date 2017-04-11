import WeeklyReport from './WeeklyReport'

import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import { getReport } from '../../store/user/actions'

const styles = {
  loading: {
    textAlign: 'center',
  }
}

export default injectSheet(styles)(
  connect((state) => {
    return {
      report: state.user.get('report') ? state.user.get('report').toJS() : null
    }
  }, { getReport })(WeeklyReport)
)