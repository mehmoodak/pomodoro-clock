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
                minutes: '25',
                seconds: '00'
            },
            duration:{
                session_length: 25,
                break_length: 5
            },
            isPlaying: false,
            isResume: false,
            playType: 'session'
        }

        this.updateSettings = this.updateSettings.bind(this);
        this.updateClock = this.updateClock.bind(this);
    }

    updateSettings(type){
        
        let duration = this.state.duration;

        if(type === 'increase-session'){
            duration['session_length'] += 1; 
        }else if( type === 'decrease-session'){
            duration['session_length'] = (duration['session_length'] > 1) ? duration['session_length'] - 1 : duration['session_length'];
        }else if( type === 'increase-break'){
            duration['break_length'] += 1; 
        }else if( type === 'decrease-break'){
            duration['break_length'] = (duration['break_length'] > 1) ? duration['break_length'] - 1 : duration['break_length'];
        }

        this.setState({
            duration: duration
        });

        this.updateClock();

    }

    updateClock(){
        this.setState({
            timer: {
                minutes: '' + this.state.duration.session_length, //converting to string
                seconds: '00'
            },
            playType: 'session'
        });

    }

    startTimer(){

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
                                    <Timer minutes={this.state.timer.minutes} seconds={this.state.timer.seconds}/>
                                    <Controls isPlaying={this.state.isPlaying} isResume={this.state.isResume}/>
                                </div>
                            </div>
                            <Settings 
                                session_length={this.state.duration.session_length} break_length={this.state.duration.break_length}
                                updateSettings={ this.updateSettings}
                                />
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