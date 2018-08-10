import React, {
    Component
} from 'react';
import './PomodoroClock.scss';
import Credits from './Credits';
import Settings from './Settings';

// Circular Bar 
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Controls from './Controls';
import Timer from './Timer';

export default class PomodoroClock extends Component {

    constructor(props) {
        super(props);

        let session_length = 2;
        let break_length = 1;

        this.state = {
            timer: {
                minutes: '' + session_length,
                seconds: 0,
                percentage: 0
            },
            duration: {
                session_length: session_length,
                break_length: break_length
            },
            isPlaying: false,
            isResume: false,
            playType: 'session'
        }

        this.timerRef = null;

        this.updateSettings = this.updateSettings.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.reset = this.reset.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resumeTimer = this.resumeTimer.bind(this);
    }

    updateSettings(type) {

        let duration = this.state.duration;

        if (type === 'increase-session') {
            duration['session_length'] += 1;
        } else if (type === 'decrease-session') {
            duration['session_length'] = (duration['session_length'] > 1) ? duration['session_length'] - 1 : duration['session_length'];
        } else if (type === 'increase-break') {
            duration['break_length'] += 1;
        } else if (type === 'decrease-break') {
            duration['break_length'] = (duration['break_length'] > 1) ? duration['break_length'] - 1 : duration['break_length'];
        }


        let timer = this.updateTimer(this.state.duration.session_length, '0', this.state.playType);

        this.setState({
            duration: duration,
            timer,
        });

    }

    updateTimer(minutes, seconds, playType) {
        let timer;
        if (playType === 'session') {
            timer = {
                minutes: '' + minutes,
                seconds: seconds,
            }
            console.log("================ Session Time =================");
        } else if (playType === 'break') {
            timer = {
                minutes: '' + minutes,
                seconds: seconds
            }
            console.log("================ Break Time =================");
        }
        return timer;
    }

    startTimer() {

        if (!this.state.isPlaying && !this.state.isResume) {
            console.log("Starts");

            let timer = this.updateTimer(this.state.duration.session_length, '0', this.state.playType);
            this.setState({
                isPlaying: true
            })

            this.timerRef = setInterval(() => {

                if (parseInt(timer['minutes'], 10) === 0 && parseInt(timer['seconds'], 10) === 0) {
                    if (this.state.playType === 'session') {
                        this.setState({
                            playType: 'break',
                        });
                        timer = this.updateTimer(this.state.duration.break_length, '0', this.state.playType);
                    } else {
                        this.setState({
                            playType: 'session',
                        });
                        timer = this.updateTimer(this.state.duration.session_length, '0', this.state.playType);
                    }
                }

                if (parseInt(timer['seconds'], 10) === 0) {
                    timer['minutes']--;
                    timer['seconds'] = 59;
                } else {
                    timer['seconds']--;
                }

                timer['percentage'] = this.getTimeElapsedPercentage(timer);
                this.setState({
                    timer: timer
                })
                console.log("Minutes : ", timer.minutes, "\nSeconds : ", timer.seconds);
            }, 100);
        }
    }

    getTimeElapsedPercentage(timer) {
        let totalTimeInSec, timeElapsedInSec, timeRemainingInSec;

        this.state.playType === 'break' ?
            totalTimeInSec = this.state.duration.break_length * 60 :
            totalTimeInSec = this.state.duration.session_length * 60;

        timeRemainingInSec = parseInt(timer.minutes, 10) * 60 + parseInt(timer.seconds, 10);
        timeElapsedInSec = totalTimeInSec - timeRemainingInSec;

        console.log("Total Time : " + totalTimeInSec, "\nTotal Elapsed: " + timeElapsedInSec);

        return timeElapsedInSec / totalTimeInSec * 100;
    }

    reset() {
        if (this.state.isPlaying || this.state.isResume) {
            console.log("=============== Reset =============== ")
            let timer = this.updateTimer(this.state.duration.session_length, '0', this.state.playType);
            timer['percentage'] = this.getTimeElapsedPercentage(timer);

            this.setState({
                timer: timer,
                isPlaying: false,
                isResume: false,
                playType: 'session'
            });

            window.clearInterval(this.timerRef);
        }
    }

    stopTimer() {
        if (this.state.isPlaying) {
            window.clearInterval(this.timerRef);
            this.setState({
                isPlaying: false,
                isResume: true
            });
        }
    }

    resumeTimer(){
        if (this.state.isResume) {
            console.log("Resume");

            let timer = this.state.timer;
            this.setState({
                isPlaying: true,
                isResume: false
            });

            this.timerRef = setInterval(() => {

                if (parseInt(timer['seconds'], 10) === 0) {
                    timer['minutes']--;
                    timer['seconds'] = 59;
                } else {
                    timer['seconds']--;
                }

                timer['percentage'] = this.getTimeElapsedPercentage(timer);
                this.setState({
                    timer: timer
                })
                console.log("Minutes : ", timer.minutes, "\nSeconds : ", timer.seconds);
            }, 100);
        }
    }

    render() {

        let progressBarClasses;

        if (this.state.playType === 'break') {
            progressBarClasses = 'break'
        } else {
            progressBarClasses = 'session';
        }

        return (
            <div>
                <div className="clock-container">
                    <h2 className="page-title"> Pomodoro Clock </h2>
                    <div className="clock-wrapper">
                        <div id="clock" className="clock">
                            <CircularProgressbar initialAnimation={true} className={progressBarClasses} percentage={this.state.timer.percentage} text={null} strokeWidth='4' />
                            <div id="clock-timer">
                                <div className="clock-inner"> {this.state.playType === 'session' &&
                                    <h2 id="timer-active"> Session</h2>
                                } {this.state.playType === 'break' &&
                                    <h2 id="timer-active"> Break </h2>
                                    }
                                    <Timer minutes={this.state.timer.minutes} seconds={this.state.timer.seconds} />
                                    <Controls
                                        isPlaying={this.state.isPlaying}
                                        isResume={this.state.isResume}
                                        startTimer={this.startTimer}
                                        stopTimer={this.stopTimer}
                                        resumeTimer={this.resumeTimer}
                                        reset={this.reset} />
                                </div>
                            </div> {!this.state.isPlaying &&
                                <Settings session_length={this.state.duration.session_length} break_length={this.state.duration.break_length} updateSettings={this.updateSettings} />}
                        </div>
                    </div>
                </div>
                < audio id="tone">
                    <source src="./../../assets/audio/tone.mp3" type="audio/mp3" /> Your browser does not support the audio element. </audio>
                <Credits />
            </div>
        );
    }
}