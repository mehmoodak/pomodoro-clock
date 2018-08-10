import React, {
    Component
} from 'react';
import './PomodoroClock.scss';
import Settings from './Settings';
import Controls from './Controls';
import Timer from './Timer';
import Source from './Source';
import audio from "./../../assets/audio/tone.mp3";

// Circular Bar 
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default class PomodoroClock extends Component {

    constructor(props) {
        super(props);

        let session_length = 2;
        let break_length = 1;

        this.state = {
            timer: {
                minutes: session_length,
                seconds: 0,
                percentage: 0
            },
            duration: {
                session_length: session_length,
                break_length: break_length
            },
            isPlaying: false,
            isStop: false,
            playType: 'session'
        }

        this.timerRef = null; // track our interval reference

        this.updateSettings = this.updateSettings.bind(this);
        this.start = this.start.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.reset = this.reset.bind(this);
        this.stop = this.stop.bind(this);
        this.resume = this.resume.bind(this);
        this.changeTimerType = this.changeTimerType.bind(this);
    }

    /**
     * Update Clock with Timer (increase or decrease)
     * @param {string} type - contain type of setting which we have to change 
     */
    updateSettings(type) {

        if (!this.state.isPlaying) {

            let duration = this.state.duration;
            let isInvalid = false; // to show alert if user input is invalid

            if (type === 'increase-session') {
                duration['session_length'] += 1;
            } else if (type === 'decrease-session') {
                (duration['session_length'] > 1) ? duration['session_length'] -= 1 : isInvalid = true;
            } else if (type === 'increase-break') {
                duration['break_length'] += 1;
            } else if (type === 'decrease-break') {
                (duration['break_length'] > 1) ? duration['break_length'] -= 1 : isInvalid = true;
            }

            if (isInvalid) {
                alert("Times less than 1 minutes is not allowed.");
            } else {
                this.setState({
                    isPlaying: false,
                    isStop: false,
                    duration: duration,
                    timer: {
                        minutes: this.state.duration.session_length,
                        seconds: '0',
                        percentage: this.getTimeElapsedPercentage(this.state.duration.session_length, 0)
                    }
                });
            }
        }
    }

    /**
     * Return true if timer ended.
     * @param {object} timer 
     */
    isTimerEnded(timer) {
        if (parseInt(timer['minutes'], 10) === 0 && parseInt(timer['seconds'], 10) === 0) {
            return true;
        }
    }

    /**
     * Return new timer object and update playType based on the timer selected before
     */
    changeTimerType() {
        this.playAudio();
        if (this.state.playType === 'session') {
            this.setState({
                playType: 'break',
            });
            return {
                minutes: this.state.duration.break_length,
                seconds: '0',
                percentage: this.getTimeElapsedPercentage(this.state.duration.break_length, 0)
            }
        } else {
            this.setState({
                playType: 'session',
            });
            return {
                minutes: this.state.duration.session_length,
                seconds: '0',
                percentage: this.getTimeElapsedPercentage(this.state.duration.session_length, 0)
            }
        }
    }

    /**
     * Update Timer - 1 second each time
     * @param {object} timer 
     */
    updateTimer(timer) {
        if (parseInt(timer['seconds'], 10) === 0) {
            timer['minutes']--;
            timer['seconds'] = 59;
        } else {
            timer['seconds']--;
        }

        timer['percentage'] = this.getTimeElapsedPercentage(timer.minutes, timer.seconds);
        this.setState({
            timer: timer
        })
    }

    playAudio(){
        document.getElementById('tone').play();
    }

    /**
     * Starts the timer of pomodoro clock
     */
    start() {
        this.playAudio();
        if (!this.state.isPlaying && !this.state.isStop) {

            this.setState({
                isPlaying: true
            })

            this.startTimer(this.state.timer);
        }
    }

    /**
     * Start the timer and changes it after each second
     * @param {object} timer 
     */
    startTimer(timer) {
        this.timerRef = setInterval(() => {

            if (this.isTimerEnded(timer)) {
                timer = this.changeTimerType();
            }

            this.updateTimer(timer)
        }, 1000);
    }

    /**
     * Return percentage of time elapsed
     * @param {int} minutes 
     * @param {int} seconds 
     */
    getTimeElapsedPercentage(minutes, seconds) {
        let totalTimeInSec, timeElapsedInSec, timeRemainingInSec;

        this.state.playType === 'break' ?
            totalTimeInSec = this.state.duration.break_length * 60 :
            totalTimeInSec = this.state.duration.session_length * 60;

        timeRemainingInSec = minutes * 60 + seconds;
        timeElapsedInSec = totalTimeInSec - timeRemainingInSec;

        return timeElapsedInSec / totalTimeInSec * 100;
    }

    /**
     * Resets the Pomodoro Clock
     */
    reset() {
        if (this.state.isPlaying || this.state.isStop) { // only reset if playing or resume

            this.setState({
                timer: {
                    minutes: this.state.duration.session_length,
                    seconds: '0',
                    percentage: '0'
                },
                isPlaying: false,
                isStop: false,
                playType: 'session'
            });

            window.clearInterval(this.timerRef);
        }
    }

    /**
     * Stops the Pomodoro Clock
     */
    stop() {
        if (this.state.isPlaying) {
            window.clearInterval(this.timerRef);
            this.setState({
                isPlaying: false,
                isStop: true
            });
        }
    }

    /**
     * Resumes the Pomodoro Clock
     */
    resume() {
        if (this.state.isStop) {

            this.setState({
                isPlaying: true,
                isStop: false
            });

            this.startTimer(this.state.timer)
        }
    }

    render() {

        // add class based on type which manage styling of progressBar
        let progressBarClasses = (this.state.playType === 'break') ? 'break' : 'session';

        return (
            <div>
                <div className="clock-container">
                    <h2 className="page-title"> Pomodoro Clock </h2>
                    <div className="clock-wrapper">
                        <div id="clock" className="clock">
                            <CircularProgressbar initialAnimation={true} className={progressBarClasses} percentage={this.state.timer.percentage} text={null} strokeWidth='4' />
                            <div id="clock-timer">
                                <div className="clock-inner">
                                    <h2 id="timer-active"> {this.state.playType === 'session' ? 'Session' : 'Break'}</h2>
                                    <Timer minutes={this.state.timer.minutes} seconds={this.state.timer.seconds} />
                                    <Controls
                                        isPlaying={this.state.isPlaying}
                                        isStop={this.state.isStop}
                                        startTimer={this.start}
                                        stopTimer={this.stop}
                                        resumeTimer={this.resume}
                                        reset={this.reset} />
                                </div>
                            </div>
                            {
                                !this.state.isPlaying ?
                                    <Settings session_length={this.state.duration.session_length} break_length={this.state.duration.break_length} updateSettings={this.updateSettings} /> :
                                    null
                            }
                        </div>
                    </div>
                </div>
                <audio id="tone">
                    <source src={audio} type="audio/mp3" /> Your browser does not support the audio element. </audio>
                <Source />
            </div>
        );
    }
}