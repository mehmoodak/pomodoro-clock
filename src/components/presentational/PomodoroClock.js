import React, { Component } from 'react';
import './PomodoroClock.scss';
import Credits from './Credits';
import Settings from './Settings';

// Circular Bar 
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Controls from './Controls';
import Timer from './Timer';

export default class PomodoroClock extends Component {

    constructor(props){
        super(props);

        this.state = {
            timer: {
                minutes: null,
                seconds: null
            },
            duration:{
                session_length: 25,
                break_length: 5
            },
            isPlaying: false,
            isResume: false
        }
    }
    render() {
        return (
            <div>
                <div className="clock-container">
                    <h2 className="page-title">Pomodoro Clock</h2>

                    <div className="clock-wrapper">
                        <div id="clock" className="clock">
                            <CircularProgressbar
                                percentage={0}
                                text={null}
                                strokeWidth='4'
                            />
                            <div id="clock-timer">
                                <div className="clock-inner">
                                    <h2 id="timer-active">Session</h2>
                                    <Timer/>
                                    <Controls/>
                                </div>
                            </div>
                            <Settings session_length={this.state.duration.session_length} break_length={this.state.duration.break_length}/>
                        </div>
                    </div>
                </div>

                <audio id="tone">
                    <source src="./../../assets/audio/tone.mp3" type="audio/mp3" />
                    Your browser does not support the audio element.
                    </audio>

                <Credits/>
            </div>
        );
    }
}