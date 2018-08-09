import React, { Component } from 'react';
import './PomodoroClock.scss';
import Credits from './Credits';

// Circular Bar 
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlus, faMinus, faPlay, faRedo } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faPlus, faMinus)

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
                                    <div id="timer-value" data-status="stopped">
                                        <span id="minutes">25</span>:<span id="seconds">00</span>
                                    </div>
                                    <div className="timer-controls">
                                        <div id="play" className="control-item">
                                            <FontAwesomeIcon icon={faPlay} />
                                            <span>Start</span>
                                        </div>
                                        <div id="reset" className="control-item">
                                            <FontAwesomeIcon icon={faRedo} />
                                            <span>Reset</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clock-settings">
                                <div className="settings-title">
                                    <hr />
                                    <span> Settings </span>
                                    <hr />
                                </div>
                                <div className="settings-items">
                                    <div className="setting-item session-item">
                                        <div className="item-title">Session Length</div>
                                        <div className="item-inputs">
                                            <div className="input-decrease">
                                                <button id="decrease-session" className="btn-icons"><FontAwesomeIcon icon={faMinus} /></button>
                                            </div>
                                            <div className="input-value">25</div>
                                            <div className="input-increase">
                                                <button id="increase-session" className="btn-icons"><FontAwesomeIcon icon={faPlus} /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="setting-item break-item">
                                        <div className="item-title">Break Length</div>
                                        <div className="item-inputs">
                                            <div className="input-decrease">
                                                <button id="decrease-break" className="btn-icons"><FontAwesomeIcon icon={faMinus} /></button>
                                            </div>
                                            <div className="input-value">5</div>
                                            <div className="input-increase">
                                                <button id="increase-break" className="btn-icons"><FontAwesomeIcon icon={faPlus} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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