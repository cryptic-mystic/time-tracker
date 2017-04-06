import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { withRouter } from 'react-router'

import { signUp } from '../../store/user/actions'

import SignUp from './SignUp'

const styles = {
  signup: {
    padding: '40px 60px',
    textAlign: 'center',
    '& h1': {
      textAlign: 'center',
      margin: '0 0 20px'
    }
  },
  button: {
    margin: '20px 0'
  }
}

export default withRouter(injectSheet(styles)(
  connect((state) => {
      return {}
  }, { signUp })(SignUp)
))