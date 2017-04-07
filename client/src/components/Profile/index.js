import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import Profile from './Profile'

import { logout } from '../../store/user/actions'

const styles = {
  profile: {
    padding: '10px',
    textAlign: 'center',
    '& h2': {
      textAlign: 'center',
      margin: '20px 0'
    }
  }
}

export default injectSheet(styles)(
  connect((state) => {
      return {}
  }, { logout })(Profile)
)
