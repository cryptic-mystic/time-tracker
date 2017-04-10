import DeleteTimeDialog from './DeleteTimeDialog'

import { connect } from 'react-redux'

import { deleteTime } from '../../store/user/actions'
import { snackbarMessage } from '../../store/snackbar/actions'

export default connect((state) => {
  return {}
}, { deleteTime, snackbarMessage })(DeleteTimeDialog)