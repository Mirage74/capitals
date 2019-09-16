import React from 'react'
const ms = require('pretty-ms')
class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: this.props.timeForTurnInSec,
      start: 0,
      isOn: false,
      timeOut: false
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)

    //    console.log(this.props)
  }
  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    })
    this.timer = setInterval(
      () => {
        let restTime = this.props.timeForTurnInSec * 1000 - Date.now() + this.state.start
        if (restTime >= 0) {
          this.setState({
            time: restTime
          })
        } else {
          console.log("timeOut !")
          this.setState({timeOut: true, time: 0})
          this.stopTimer()
        }
      }
      , 1000);
  }
  stopTimer() {
    this.setState({ isOn: false })
    clearInterval(this.timer)
  }

  componentDidMount() {
    this.startTimer()
  }

  render() {
    //let start = <button onClick={this.startTimer}>start</button>
    return (
      <div>
        <h3>timer: {ms(this.state.time)}</h3>
      </div>
    )
  }
}
export default Timer