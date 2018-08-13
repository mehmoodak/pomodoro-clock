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

        if (!this.props.isPlaying) {

            let isInvalid = false; // to show alert if user input is invalid

            if (type === 'increase-session') {
                this.props.increaseSession();
            } else if (type === 'decrease-session') {
                (this.props.session_length > 1) ? this.props.decreaseSession() : isInvalid = true;
            } else if (type === 'increase-break') {
                this.props.increaseBreak();
            } else if (type === 'decrease-break') {
                (this.props.break_length > 1) ? this.props.decreaseBreak() : isInvalid = true;
            }

            if (isInvalid) {
                alert("Times less than 1 minutes is not allowed.");
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
        if (this.props.playType === 'session') {
            this.props.setPlayType('break');
            return {
                minutes: this.props.break_length,
                seconds: '0',
                percentage: this.getTimeElapsedPercentage(this.props.break_length, 0)
            }
        } else {
            this.props.setPlayType('session');
            return {
                minutes: this.props.session_length,
                seconds: '0',
                percentage: this.getTimeElapsedPercentage(this.props.session_length, 0)
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
        this.props.setTimer(timer);
    }

    playAudio() {
        document.getElementById('tone').play();
    }

    /**
     * Starts the timer of pomodoro clock
     */
    start() {
        if (!this.props.isPlaying && !this.props.isStop) {
            this.playAudio();
            this.props.setIsPlaying(true);
            this.startTimer(this.props.timer);
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

        this.props.playType === 'break' ?
            totalTimeInSec = this.props.break_length * 60 :
            totalTimeInSec = this.props.session_length * 60;

        timeRemainingInSec = minutes * 60 + seconds;
        timeElapsedInSec = totalTimeInSec - timeRemainingInSec;

        return timeElapsedInSec / totalTimeInSec * 100;
    }

    /**
     * Resets the Pomodoro Clock
     */
    reset() {
        if (this.props.isPlaying || this.props.isStop) { // only reset if playing or resume

            this.props.setIsPlaying(false);
            this.props.setIsStop(false);
            this.props.setPlayType('session');
            this.props.setTimer({
                minutes: this.props.session_length,
                seconds: 0,
                percentage: 0
            });

            window.clearInterval(this.timerRef);
        }
    }

    /**
     * Stops the Pomodoro Clock
     */
    stop() {
        if (this.props.isPlaying) {
            window.clearInterval(this.timerRef);
            this.props.setIsPlaying(false);
            this.props.setIsStop(true);
        }
    }

    /**
     * Resumes the Pomodoro Clock
     */
    resume() {
        if (this.props.isStop) {

            this.props.setIsPlaying(true);
            this.props.setIsStop(false);
            this.startTimer(this.props.timer)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.session_length !== prevProps.session_length) {
            this.props.setTimer({
                minutes: this.props.session_length,
                seconds: 0,
                percentage: this.getTimeElapsedPercentage(this.props.session_length, 0)
            });
        }
    }

    render() {

        // add class based on type which manage styling of progressBar
        let progressBarClasses = (this.props.playType === 'break') ? 'break' : 'session';

        return (
            <div>
                <div className="clock-container">
                    <h2 className="page-title"> Pomodoro Clock </h2>
                    <div className="clock-wrapper">
                        <div id="clock" className="clock">
                            <CircularProgressbar initialAnimation={true} className={progressBarClasses} percentage={this.props.timer.percentage} text={null} strokeWidth='4' />
                            <div id="clock-timer">
                                <div className="clock-inner">
                                    <h2 id="timer-active"> {this.props.playType === 'session' ? 'Session' : 'Break'}</h2>
                                    <Timer minutes={this.props.timer.minutes} seconds={this.props.timer.seconds} />
                                    <Controls
                                        isPlaying={this.props.isPlaying}
                                        isStop={this.props.isStop}
                                        startTimer={this.start}
                                        stopTimer={this.stop}
                                        resumeTimer={this.resume}
                                        reset={this.reset} />
                                </div>
                            </div>
                            {
                                !this.props.isPlaying ?
                                    <Settings session_length={this.props.session_length} break_length={this.props.break_length} updateSettings={this.updateSettings} /> :
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