import React, { Component } from 'react';
import './Timer.scss'

export default class Timer extends Component {
    render() {
        return (
            <div id="timer-value" data-status="stopped">
                <span id="minutes">25</span>:<span id="seconds">00</span>
            </div>
        );
    }
}