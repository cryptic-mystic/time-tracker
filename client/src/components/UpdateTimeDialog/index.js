import UpdateTimeDialog from './UpdateTimeDialog'

import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import { updateTime } from '../../store/user/actions'
import { snackbarMessage } from '../../store/snackbar/actions'

const styles = {
  updateDialog: {
    textAlign: 'center'
  }
}

export default injectSheet(styles)(
  connect((state) => { return {} }, { updateTime, snackbarMessage })(UpdateTimeDialog)
)