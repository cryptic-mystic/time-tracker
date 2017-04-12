import CreateTimeDialog from './CreateTimeDialog'

import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import { createTime } from '../../store/user/actions'
import { snackbarMessage } from '../../store/snackbar/actions'

const styles = {
  createDialog: {
    textAlign: 'center'
  }
}

export default injectSheet(styles)(
  connect((state) => {
    return {
      user: state.profile !== null ? state.profile.get('profile').toJS() : null
    }
  }, { createTime, snackbarMessage })(CreateTimeDialog)
)