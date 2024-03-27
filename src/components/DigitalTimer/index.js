import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  
  constructor(props){
    super(props)
    this.state = {
    isPlaying: true,
    isStarted: false,
    sec: 0,
    timer: 25,
    stopWatch: 25,
  }
  }
  componentWillUnmount() {
    this.clearTimerInterval()
  }
  
  onClikcToStart = () => {
    const {timer, stopWatch} = this.state
    this.setState({isPlaying: false, sec: stopWatch*60})
    this.setState(prevState => ({isStarted: !prevState.isStarted}))
    this.timerId = setInterval(this.timerFunction, 1000)
  }
  clearTimerInterval = () => clearInterval(this.timerId)
  timerFunction = () => {
    const {stopWatch, sec} = this.state
    this.setState(prevState =>({sec: prevState.sec - 1}))
    const convertedtoMinuts = sec/60
    const stringfied = String(convertedtoMinuts)
    const splitted = stringfied.split(".") 
    const minutes = "0."+String(splitted[1])
    let time
    if (sec%60 === 0){
      time = splitted[0]+":00"
      
    }else{
      const twoDecimal = minutes
      
      const floored = Math.round(twoDecimal*60)
      if (floored > 9) {
        time = splitted[0] + ":" + floored
      }else{
        time = splitted[0] + ":0" + floored
      }
      
      
    }
    this.setState({stopWatch: time})
    
  }
  onClikcToPlay = () => {
    const {timer, stopWatch} = this.state
    this.setState(prevState => ({isStarted: !prevState.isStarted}))
    this.timerId = setInterval(this.timerFunction, 1000)
  }
  onClikcToPause = () => {
    this.setState(prevState => ({isStarted: !prevState.isStarted}))
  }
  onClickToResst = () => {
    this.setState({
      isPlaying: true,
      isStarted: false,
      timer: 25,
      sec: 0,
      stopWatch: 25,
    })
    this.componentWillUnmount()
  }
  onClickDe = () => {
    const {isStarted, timer} = this.state
    if (isStarted === false && timer > 1) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
      this.setState({stopWatch: timer - 1})
    }
  }
  onClickIn = () => {
    const {isStarted, timer} = this.state
    if (isStarted === false) {
      this.setState(prevState => ({timer: prevState.timer + 1}))
      this.setState({stopWatch: timer + 1})
    }
  }

  render() {
    const {isPlaying, timer, sec, isStarted, stopWatch} = this.state
    const isPlayOrPauseImage = isStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const isTimerStatus = isStarted ? 'Running' : 'Paused'
    const startOrPauseAltText = isStarted ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="bottom-section">
          <div className="timer-container">
            <div className="counter">
              <h1 className="timer">{stopWatch}</h1>
              <p className="playStatus">{isTimerStatus}</p>
            </div>
          </div>
          <div>
            <div className="play-pause-container">
              <div className="play-pause">
                <h1>
                  {isPlaying ? (
                    <button
                      alt="play icon"
                      className="btn"
                      onClick={this.onClikcToStart}
                    >
                      <img src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png" />
                      <h1>Start</h1>
                    </button>
                  ) : isStarted ? (
                    <button
                      alt="play icon"
                      onClick={this.onClikcToPause}
                      className="btn"
                    >
                      <img src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png" />
                      <h1>Play</h1>
                    </button>
                  ) : (
                    <button
                      alt="pause icon"
                      onClick={this.onClikcToPlay}
                      className="btn"
                    >
                      <img src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png" />
                      <h1>Pause</h1>
                    </button>
                  )}
                </h1>
              </div>
              <div className="play-pause">
                <button onClick={this.onClickToResst} className="btn">
                  <img
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  />
                </button>
                <h1>Reset</h1>
              </div>
            </div>
            <div className="set-timer-limit-container">
              <p>Set Timer Limit</p>
              <div className="time-set">
                <button onClick={this.onClickDe} className="btn" type="submit">
                  <h1 className="margin">-</h1>
                </button>

                <h1 className="margin input" type="text">
                  {timer}
                </h1>
                <button onClick={this.onClickIn} className="btn" type="submit">
                  <h1 className="margin">+</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
