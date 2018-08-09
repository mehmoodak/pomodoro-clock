import React, { Component } from 'react';
import './Settings.scss'

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faMinus)

export default class Settings extends Component {
    render() {
        return (
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
                                <button id="decrease-session" className="btn-icons" onClick={() => this.props.updateSettings('decrease-session')}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </div>
                            <div className="input-value">{this.props.session_length}</div>
                            <div className="input-increase">
                                <button id="increase-session" className="btn-icons" onClick={() => this.props.updateSettings('increase-session')}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="setting-item break-item">
                        <div className="item-title">Break Length</div>
                        <div className="item-inputs">
                            <div className="input-decrease">
                                <button id="decrease-break" className="btn-icons" onClick={() => this.props.updateSettings('decrease-break')}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </div>
                            <div className="input-value">{this.props.break_length}</div>
                            <div className="input-increase">
                                <button id="increase-break" className="btn-icons" onClick={()=> this.props.updateSettings('increase-break')}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}