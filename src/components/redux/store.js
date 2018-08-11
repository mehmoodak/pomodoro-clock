import { createStore } from 'redux';
import pomodoroClock from './reducers'

const store = createStore (pomodoroClock);

export default store;