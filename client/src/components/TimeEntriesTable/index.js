import TimeEntriesTable from './TimeEntriesTable'

import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import { getTimes } from '../../store/user/actions'

const styles = {
  controls: {
    composes: ['clearfix'],
    position: 'relative'
  },
  filterControls: {
    width: '40%',
    '@media (min-width: 545px)': {
      display: 'block'
    }
  },
  recordControls: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    '& > div': {
      margin: '0 5px'
    },
    '@media (max-width: 545px)': {
      display: 'block',
      position: 'relative'
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