import React from 'react'

import { LineChart, Line, Tooltip, XAxis } from 'recharts'
import CircularProgress from 'material-ui/CircularProgress'
import Measure from 'react-measure'

export default class UserWeeklyReport extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentDidUpdate() {
    let { report } = this.props,
      { loading } = this.state

    if (report != null && loading) this.setState({ loading: false })
  }

  render() {
    let { classes, sheet, report } = this.props,
      chartData = report ? report.reverse() : null,
      { loading } = this.state

    if (loading) return <div className={classes.loading}>
      <CircularProgress color='#ff4081' size={80} thickness={8} />
    </div>

    return chartData && chartData.length ? <Measure>
      { ({ width, height }) => 
        <div>
          <h3>Weekly Report</h3>
          <LineChart width={width} height={width/3} data={chartData}>
            <Line type="monotone" name='Avg. Pace' dataKey="avg_pace" stroke="#ff4081" />
            <Line type="monotone" name='Avg. Distance' dataKey="avg_distance" stroke="#00bcd4" />
            <Tooltip labelFormatter={(index) => report[index].week }/>
          </LineChart>
        </div>
      }
    </Measure>
    :
    <div>No report records available yet :)</div>
  }
}