import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import PomodoroClockContainer from './components/container/PomodoroClockContainer';
import { Provider } from 'react-redux';
import store from './redux/store'

ReactDOM.render(
    <Provider store={store}>
        <PomodoroClockContainer/>
    </Provider>, 
    document.getElementById('root'));
