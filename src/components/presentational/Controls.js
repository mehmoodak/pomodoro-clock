import React, { Component } from 'react';
import './Controls.scss'

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faRedo, faStop } from '@fortawesome/free-solid-svg-icons'
library.add(faRedo, faPlay, faStop)

/**
 * Manages the controls layout of the timer (i.e. start, stop, resume, reset)
 */
export default class Controls extends Component {
    render() {
        return (
            <div className="timer-controls">
                {   
                    // Show if not playing and not started
                    (!this.props.isPlaying && !this.props.isStop) &&
                    <div className="control-item" onClick={() => this.props.startTimer()}>
                        <FontAwesomeIcon icon={faPlay} />
                        <span>Start</span>
                    </div>

                }
                {
                    // show if playing
                    (this.props.isPlaying && !this.props.isStop) &&
                    <div className="control-item" onClick={() => this.props.stopTimer()}>
                        <FontAwesomeIcon icon={faStop} />
                        <span>Stop</span>
                    </div>
                }
                {
                    // show if stopped
                    (!this.props.isPlaying && this.props.isStop) &&
                    <div className="control-item" onClick={() => this.props.resumeTimer()}>
                        <FontAwesomeIcon icon={faPlay} />
                        <span>Resume</span>
                    </div>
                }
                {
                    // show if playing or stopped
                    (this.props.isPlaying || this.props.isStop) &&
                    <div id="reset" className="control-item" onClick={() => this.props.reset()}>
                        <FontAwesomeIcon icon={faRedo} />
                        <span>Reset</span>
                    </div>
                }
            </div>
        );
    }
}