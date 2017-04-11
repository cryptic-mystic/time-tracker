import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import DeleteTimeDialog from '../DeleteTimeDialog'
import UpdateTimeDialog from '../UpdateTimeDialog'

export default class TimeEntriesTable extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      deleteConfirmOpen: false,
      updateDialogOpen: false,
      selected: null
    }
  }

  componentWillMount() {
    this.props.getTimes()
  }

  componentWillUpdate(nextProps, nextState) {
    let { entries } = nextProps,
      { loading } = nextState

    if (entries != null && loading) this.setState({ loading: false })
  }

  render() {
    let { classes, sheet, entries } = this.props,
      { selected, loading, deleteConfirmOpen, updateDialogOpen } = this.state,
      isSelected = selected !== null,
      selectedEntry = entries && entries.length && isSelected ? entries[selected] : null,
      self = this

    if (loading) return <div className={classes.loading}>
      <CircularProgress color='#ff4081' size={80} thickness={8} />
    </div>

    return entries && entries.length ? <div>
        <div>
          <h3>Time Records</h3>
        </div>
        <div className={classes.controls}>
          <RaisedButton disabled={!isSelected}
            label="Update"
            onTouchTap={() => self.setState({ updateDialogOpen: true })}
          />
          <RaisedButton disabled={!isSelected}
            secondary={true}
            label="Delete"
            onTouchTap={() => self.setState({ deleteConfirmOpen: true })}
          />
        </div>
        <Table onCellClick={(row, col) => 
          self.setState({ selected: selected === row ? null : row })}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Distance</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
              <TableHeaderColumn>Pace</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.props.entries.map((entry, i) => 
              <TableRow key={i}>
                <TableRowColumn>{entry.date_display}</TableRowColumn>
                <TableRowColumn>{entry.distance} miles</TableRowColumn>
                <TableRowColumn>{entry.time}</TableRowColumn>
                <TableRowColumn>{Math.round(entry.avg_speed*100)/100} min/mi</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table> 
        <DeleteTimeDialog
          recordToDelete={selectedEntry}
          open={deleteConfirmOpen}
          onRequestClose={() => self.setState({ deleteConfirmOpen: false })}
        />

        <UpdateTimeDialog
          recordToUpdate={selectedEntry}
          open={updateDialogOpen}
          onRequestClose={() => self.setState({ updateDialogOpen: false })}
        />
      </div>
      :
      <div>No time records have been recorded yet. Go track!</div>
    }
}