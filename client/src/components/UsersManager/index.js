import UsersManager from './UsersManager'

import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import { getUsers } from '../../store/users/actions'

const styles = {
  manager: {
    padding: '10px',
    textAlign: 'center',
    '& h2': {
      textAlign: 'center',
      margin: '20px 0'
    }
  },
  loading: {
    textAlign: 'center',
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
      users: state.users ? state.users.toJS() : null
    }
  }, { getUsers })(UsersManager)
)