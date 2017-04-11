import TimeEntriesTable from './TimeEntriesTable'

import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import { getTimes } from '../../store/user/actions'

const styles = {
  controls: {
    textAlign: 'right',
    '& > div': {
      margin: '0 5px'
    }
  },
  loading: {
    textAlign: 'center',
  }
}

export default injectSheet(styles)(
  connect((state) => {
    return {
      entries: state.user.get('timeEntries') ? state.user.get('timeEntries').toJS() : null
    }
  }, { getTimes })(TimeEntriesTable)
)