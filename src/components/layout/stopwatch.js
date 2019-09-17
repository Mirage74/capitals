import React from 'react'
class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: this.props.timeForTurnInSec,
      start: 0
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)

    //    console.log(this.props)
  }

  componentDidMount() {
    this.startTimer()
  }
componentWillUnmount() {
  this.stopTimer()
}
  componentDidUpdate(prevProps) {
    if (this.props.index !==prevProps.index) {
      // console.log("prevprops", prevProps)
      // console.log("this.props", this.props)         
      this.startTimer()
    }
  }

  startTimer() {
    this.setState({
      time: this.props.timeForTurnInSec,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(
      () => {
        let restTime = this.props.timeForTurnInSec * 1000 - Date.now() + this.state.start
        if (restTime >= 0) {
          this.setState({
            time: Math.round(restTime / 1000)
          })
        } else {
          //console.log("timeOut !")
          this.setState({time: 0})
          this.props.timeOutCB()
          this.stopTimer()
        }
      }
      , 1000);
  }
  stopTimer() {
    clearInterval(this.timer)
  }


  render() {
    return (
      <div >
        <h3>{this.state.time}s</h3>
      </div>
    )
  }
}
export default Timer