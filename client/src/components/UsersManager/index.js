import UsersManager from './UsersManager'
import injectSheet from 'react-jss'

const styles = {
  manager: {
    padding: '10px',
    textAlign: 'center',
    '& h2': {
      textAlign: 'center',
      margin: '20px 0'
    }
  }
}

export default injectSheet(styles)(UsersManager)