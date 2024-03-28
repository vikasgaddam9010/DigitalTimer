import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: true,
      isStarted: false,
      sec: 0,
      timer: 25,
      stopWatch: '25:00',
    }
  }
  onClikcToStart = () => {
    const {timer, stopWatch} = this.state
    let stopWatchMinutes 
    const againSplitted = stopWatch.split(':')
    if(againSplitted[1] > 0){
      let totalSeconds = parseInt(againSplitted[0]*60) + parseInt(againSplitted[1])
      stopWatchMinutes = totalSeconds
      
    }else{
      stopWatchMinutes = againSplitted[0]*60
    }
    
    this.setState({isPlaying: false, sec: stopWatchMinutes})
    this.setState(prevState => ({isStarted: !prevState.isStarted}))
    this.timerId = setInterval(this.timerFunction, 100)
  }
  clearTimerInterval = () => clearInterval(this.timerId)

  timerFunction = () => {
    const {stopWatch, sec} = this.state
    this.setState(prevState => ({sec: prevState.sec - 1}))
    const convertedtoMinuts = sec / 60
    const stringfied = String(convertedtoMinuts)
    const splitted = stringfied.split('.')
    const minutes = splitted[0]
    const seconds = '0.' + String(splitted[1])

    let time
    if (sec > 0) {
      if (sec % 60 === 0 && sec > 0) {
        time = minutes + ':00'       
        
      } else {
        const twoDecimal = seconds
        const floored = Math.round(twoDecimal * 60)
        if (floored > 9) {
          if(minutes > 9){
            time = minutes + ':' + floored
          }else{
            time = `0${minutes}:${floored}`
          }
          
        } else {
          if(minutes < 10){
            time = "0"+minutes + ':0' + floored
          }else if (floored<10){
            time = `${minutes}:0${floored}`
          }else{
            time = `${minutes}:${floored}`
          }
        }
      }
    } else {
      time = `0${minutes}:00`
      this.clearTimerInterval()
    }
    this.setState({stopWatch: time})
  }
  onClikcToPause = () => {
    this.setState(prevState => ({isStarted: !prevState.isStarted}))
    this.clearTimerInterval()
  }
  onClickToReset = () => {
    this.setState({
      isPlaying: true,
      isStarted: false,
      timer: 25,
      sec: 0,
      stopWatch: '25:00',
    })
    this.clearTimerInterval()
  }
  onClickDe = () => {
    const {isStarted, timer} = this.state
    if (isStarted === false && timer > 1) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
      let settime
      if (timer -2 < 9){
        settime = `0${timer - 1}:00`
      }else{
        settime = `${timer - 1}:00`
      }
      this.setState({stopWatch: settime})
    }
  }
  onClickIn = () => {
    const {isStarted, timer} = this.state
    if (isStarted === false) {
      this.setState(prevState => ({timer: prevState.timer + 1}))
      let settime
      if (timer < 9){
        settime = `0${timer + 1}:00`
      }else{
        settime = `${timer + 1}:00`
      }
      this.setState({stopWatch: settime})
    }
  }

  render() {
    const {isPlaying, timer, sec, isStarted, stopWatch} = this.state
    const isTimerStatus = isStarted ? 'Running' : 'Paused'
    const buttonImag = isStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const btnFunction = isStarted ? this.onClikcToPause : this.onClikcToStart
    const imgAlt = isStarted ? 'pause icon' : 'play icon'
    const headText = isStarted ? 'Pause' : 'Start'
    console.log(sec)
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
                <div>
                  {
                    <button alt={imgAlt}
                     onClick={btnFunction}
                     className="btn">
                      <img src={buttonImag} />
                      <p>{imgAlt}</p>
                      <h1>{headText}</h1>
                    </button>
                  }
                </div>
              </div>
              <div className="play-pause">
                <button onClick={this.onClickToReset} className="btn">
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

                <p className="margin input" type="text">
                  {timer}
                </p>
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
