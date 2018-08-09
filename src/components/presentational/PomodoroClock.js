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

    render() {
        return (
            <div>
                <div className="clock-container">
                    <h2 className="page-title">Pomodoro Clock</h2>

                    <div className="clock-wrapper">
                        <div id="clock" className="clock">
                            <CircularProgressbar
                                percentage={66}
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
                            <Settings/>
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