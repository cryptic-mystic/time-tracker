import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import SignIn from './SignIn'

import { signIn } from '../../store/user/actions'

const styles = {
  signin: {
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

export default injectSheet(styles)(
  connect((state) => {
      return {}
  }, { signIn })(SignIn)
)