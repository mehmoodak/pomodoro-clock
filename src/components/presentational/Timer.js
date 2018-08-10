import React, { Component } from 'react';
import './Timer.scss'

export default class Timer extends Component {
    render() {
        return (
            <div id="timer-value" data-status="stopped">
                <span id="minutes">{this.props.minutes}</span>
                :
                {   
                    this.props.seconds < 10 && <span id="seconds">{'0' + this.props.seconds}</span>
                }
                {   
                    this.props.seconds >= 10 && <span id="seconds">{this.props.seconds}</span>
                }
            </div>
        );
    }
}