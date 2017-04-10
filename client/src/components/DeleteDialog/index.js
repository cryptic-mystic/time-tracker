import DeleteDialog from './DeleteDialog'

import { connect } from 'react-redux'

import { deleteTime } from '../../store/user/actions'
import { snackbarMessage } from '../../store/snackbar/actions'

export default connect((state) => {
  return {}
}, { deleteTime, snackbarMessage })(DeleteDialog)