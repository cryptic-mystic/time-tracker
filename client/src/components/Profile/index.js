import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import Profile from './Profile'

import { logout, getProfile, deleteTime } from '../../store/user/actions'
import { snackbarMessage } from '../../store/snackbar/actions'

const styles = {
  profile: {
    padding: '10px',
    textAlign: 'center',
    '& h2': {
      textAlign: 'center',
      margin: '20px 0'
    }
  },
  content: {
    padding: '10px 0 30px'
  },
  profileCard: {
    textAlign: 'initial'
  },
  controls: {
    textAlign: 'right',
    '& > div': {
      margin: '0 5px'
    }
  }
}

export default injectSheet(styles)(
  connect((state) => {
      return {
        profile: state.user.get('profile') ? state.user.get('profile').toJS() : null,
        entries: state.user.get('timeEntries') ? state.user.get('timeEntries').toJS() : null
      }
  }, { logout, getProfile, deleteTime, snackbarMessage })(Profile)
)
