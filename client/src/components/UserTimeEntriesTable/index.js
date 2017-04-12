import UserTimeEntriesTable from './UserTimeEntriesTable'

import injectSheet from 'react-jss'

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
      position: 'relative',
      margin: '5px 0'
    }
  },
  createControls: {
    position: 'absolute',
    top: 0,
    right: 0,
    '& > div': {
      margin: '0 5px'
    },
    '@media (max-width: 545px)': {
      display: 'block',
      position: 'relative',
      margin: '5px 0'
    }
  },
  loading: {
    textAlign: 'center',
  }
}

export default injectSheet(styles)(UserTimeEntriesTable)