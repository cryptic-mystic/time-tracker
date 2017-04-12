import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import DatePicker from 'material-ui/DatePicker'

import DeleteTimeDialog from '../DeleteTimeDialog'
import UpdateTimeDialog from '../UpdateTimeDialog'
import CreateTimeDialog from '../CreateTimeDialog'

import { dateString } from '../../utils/helpers'

export default class UserTimeEntriesTable extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      deleteConfirmOpen: false,
      updateDialogOpen: false,
      createDialogOpen: false,
      selected: null,
      startDate: null,
      endDate: null
    }

    this.updateFilter = this.updateFilter.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    let { entries } = this.props,
      { loading } = this.state

    if (entries != null && loading) this.setState({ loading: false })
    else if (prevState.endDate !== this.state.endDate || prevState.startDate !== this.state.startDate)
      this.updateFilter()
  }

  updateFilter() {
    let { startDate, endDate } = this.state
    
    this.props.updater(startDate ? dateString(startDate) : undefined, endDate ? dateString(endDate) : undefined)
  }

  render() {
    let { classes, sheet, entries, viewProfile, updater } = this.props,
      { selected, loading, deleteConfirmOpen, updateDialogOpen, createDialogOpen, startDate, endDate } = this.state,
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
          <span className={classes.filterControls}>
            <DatePicker
              textFieldStyle={{ width: '100%' }}
              onChange={(none, newDate) => self.setState({startDate: newDate})}
              value={startDate}
              maxDate={endDate ? endDate : undefined}
              hintText="Start Filter"
            />
            <DatePicker
              textFieldStyle={{ width: '100%' }}
              onChange={(none, newDate) => self.setState({endDate: newDate})}
              value={endDate}
              minDate={startDate ? startDate : undefined}
              hintText="End Filter"
            />
          </span>
          <span className={classes.recordControls}>
            <RaisedButton disabled={!(endDate || startDate)}
              label="Reset Filter"
              onTouchTap={() => self.setState({ startDate: null, endDate: null })}
            />
            <RaisedButton disabled={!isSelected}
              label="Update"
              onTouchTap={() => self.setState({ updateDialogOpen: true })}
            />
            <RaisedButton disabled={!isSelected}
              secondary={true}
              label="Delete"
              onTouchTap={() => self.setState({ deleteConfirmOpen: true })}
            />
          </span>
          <span className={classes.createControls}>
            <RaisedButton
              primary={true}
              label="Create"
              onTouchTap={() => self.setState({ createDialogOpen: true })}
            />
          </span>
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
                <TableRowColumn>{Math.round(entry.pace*100)/100} min/mi</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table> 
        <DeleteTimeDialog
          recordToDelete={selectedEntry}
          open={deleteConfirmOpen}
          onRequestClose={() => self.setState({ deleteConfirmOpen: false })}
          onDelete={this.updateFilter}
        />

        <UpdateTimeDialog
          recordToUpdate={selectedEntry}
          open={updateDialogOpen}
          onRequestClose={() => self.setState({ updateDialogOpen: false })}
          onUpdate={this.updateFilter}
        />

        <CreateTimeDialog
          open={createDialogOpen}
          onRequestClose={() => self.setState({ createDialogOpen: false })}
          onCreate={this.updateFilter}
        />
      </div>
      :
      <div>No time records have been recorded yet. Go track!</div>
    }
}