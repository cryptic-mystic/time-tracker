import UpdateUserDialog from './UpdateUserDialog'

import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import { updateUser } from '../../store/users/actions'
import { snackbarMessage } from '../../store/snackbar/actions'

const styles = {
  updateDialog: {
    textAlign: 'center'
  },
  roleSelect: {
    textAlign: 'left'
  }
}

export default injectSheet(styles)(
  connect((state) => {
    return {}
  }, { updateUser, snackbarMessage })(UpdateUserDialog)
)