import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class UpdateTimeDialog extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    recordToUpdate: React.PropTypes.object
  }

  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
  }

  update() {
    let { updateTime } = this.props,
      { selected } = this.state

    console.log(`Selected: ${selected}`)
    // pop up update modal
  }

  render() {
    let { open, onRequestClose, recordToUpdate } = this.props

    return <Dialog
      title="Update Record"
      actions={[
        <FlatButton
          label="Cancel"
          onTouchTap={onRequestClose}
        />,
        <FlatButton
          label="Update"
          secondary={true}
          onTouchTap={this.update}
        />
      ]}
      open={open}
      onRequestClose={onRequestClose}
    >
      {recordToUpdate 
        ? <div>
          <div>Update this entry</div>
        </div>
        : 'Please select a record to update'
      }
    </Dialog>
  }
}