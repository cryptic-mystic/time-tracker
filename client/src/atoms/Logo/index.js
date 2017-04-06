import Logo from './Logo'
import injectSheet from 'react-jss'

export default injectSheet({
  logo: {
    textDecoration: 'none',
    color: 'black',
    '&:visited': {
      color: 'black'
    }
  }
})(Logo)