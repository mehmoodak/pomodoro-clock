import React, { Component } from 'react';
import './Timer.scss'

/**
 * Manages the minutes and seconds showing on timer
 */
export default class Timer extends Component {
    render() {
        return (
            <div id="timer-value" data-status="stopped">
                <span id="minutes">{this.props.minutes}</span>
                :
                <span id="seconds">
                    { this.props.seconds < 10 ? '0' + this.props.seconds : this.props.seconds}
                </span>
            </div>
        );
    }
}