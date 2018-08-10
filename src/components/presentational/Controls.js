import React, { Component } from 'react';
import './Controls.scss'

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faRedo } from '@fortawesome/free-solid-svg-icons'
library.add(faRedo, faPlay)

export default class Controls extends Component {
    render() {
        return (
            <div className="timer-controls">
                {
                    (!this.props.isPlaying && !this.props.isResume) &&
                    <div className="control-item" onClick={() => this.props.startTimer()}>
                        <FontAwesomeIcon icon={faPlay} />
                        <span>Start</span>
                    </div>

                }
                {
                    (this.props.isPlaying && !this.props.isResume) &&
                    <div className="control-item" onClick={() => this.props.stopTimer()}>
                        <FontAwesomeIcon icon={faPlay} />
                        <span>Stop</span>
                    </div>
                }
                {
                    (!this.props.isPlaying && this.props.isResume) &&
                    <div className="control-item" onClick={() => this.props.resumeTimer()}>
                        <FontAwesomeIcon icon={faPlay} />
                        <span>Resume</span>
                    </div>
                }
                {
                    (this.props.isPlaying || this.props.isResume) &&
                    <div id="reset" className="control-item" onClick={() => this.props.reset()}>
                        <FontAwesomeIcon icon={faRedo} />
                        <span>Reset</span>
                    </div>
                }
            </div>
        );
    }
}