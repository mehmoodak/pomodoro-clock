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
                <div id="play" className="control-item">
                    <FontAwesomeIcon icon={faPlay} />
                    <span>Start</span>
                </div>
                <div id="reset" className="control-item">
                    <FontAwesomeIcon icon={faRedo} />
                    <span>Reset</span>
                </div>
            </div>
        );
    }
}