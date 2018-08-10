import React, {Component} from 'react';
import './Source.scss'
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)

/**
 * Shows the Source (GitHub)
 */
export default class Source extends Component{
    render(){
        return(
            <a rel="noopener noreferrer" id="source-link" target="_blank" className="btn-icons"
            href="https://github.com/mehmoodak/pomodoro-clock">
            <FontAwesomeIcon icon={['fab', 'github']}/></a>  
        );
    }
}