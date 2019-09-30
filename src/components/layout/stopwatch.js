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
  }

  componentDidMount() {
    //console.log("componentDidMount timer")
    this.startTimer()
  }
  componentWillUnmount() {
    this.stopTimer()
  }
  componentDidUpdate(prevProps) {
     //console.log("componentDidUpdate TIMER")
    // console.log("this.props TIMER", this.props)
    // console.log("prevProps TIMER", prevProps)
    if (this.props.index !== prevProps.index) {
      this.startTimer()
    }
  }

  timer = setInterval(
    () => {
      //if (!this.props.questFinished) {
        let restTime = this.props.timeForTurnInSec * 1000 - Date.now() + this.state.start
        if (restTime >= 0) {
          this.setState({
            time: Math.round(restTime / 1000)
          })
        } else {
          this.props.timeOutCB()
          //this.stopTimer()
        }
      //}
    }, 1000);



  startTimer() {
    //console.log("startTimer TIMER")    
    this.setState({
      time: this.props.timeForTurnInSec,
      start: Date.now() - this.state.time
    })
  }

  stopTimer() {
    //console.log("StopTimer TIMER")    
    clearInterval(this.timer)
  }


  render() {

    let forRender
    if (!this.props.questFinished) {
      forRender = <h3>{this.state.time}s</h3>
    } else {
      forRender = null
    }
    return (
      <div >
        {forRender}
      </div>
    )
  }
}
export default Timer