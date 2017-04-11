import DeleteUserDialog from './DeleteUserDialog'

import { connect } from 'react-redux'

import { deleteUser } from '../../store/users/actions'
import { snackbarMessage } from '../../store/snackbar/actions'

export default connect((state) => {
  return {}
}, { deleteUser, snackbarMessage })(DeleteUserDialog)