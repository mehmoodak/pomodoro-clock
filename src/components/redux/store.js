import { createStore } from 'redux';
import pomodoroClock from './reducers'

const store = createStore (
    pomodoroClock,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;