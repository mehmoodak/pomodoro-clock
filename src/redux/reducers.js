import { combineReducers } from 'redux';
import {
    INCREASE_SESSION, INCREASE_BREAK, DECREASE_SESSION, DECREASE_BREAK, SET_TIMER, SET_IS_PLAYING, SET_IS_RESUME, SET_PLAY_TYPE
} from './actionTypes';


const initialState = {
    duration: {
        session_length: 25,
        break_length: 5
    },
    timer: {
        minutes: 25,
        seconds: 0,
        percentage: 0
    },
    isPlaying: false,
    isStop: false,
    playType: 'session'
}

function changeSession(session_length = initialState.duration.session_length, action) {
    switch (action.type) {
        case INCREASE_SESSION:
            return session_length + 1;
        case DECREASE_SESSION:
            if (session_length > 1) {
                return session_length - 1;
            } else {
                return session_length;
            }
        default:
            return session_length;
    }
}

function changeBreak(break_length = initialState.duration.break_length, action) {
    switch (action.type) {
        case INCREASE_BREAK:
            return break_length + 1;
        case DECREASE_BREAK:
            if (break_length > 1) {
                return break_length - 1;
            } else {
                return break_length;
            }
        default:
            return break_length;
    }
}

function setTimer(timer = initialState.timer, action) {
    switch (action.type) {
        case SET_TIMER:
            return Object.assign({}, timer, action.timer);
        default:
            return timer;
    }
}

function setIsPlaying(isPlaying = initialState.isPlaying, action) {
    switch (action.type) {
        case SET_IS_PLAYING:
            return action.isPlaying;
        default:
            return isPlaying;
    }
}

function setIsStop(isStop = initialState.isStop, action) {
    switch (action.type) {
        case SET_IS_RESUME:
            return action.isStop
        default:
            return isStop;
    }
}

function setPlayType(playType = initialState.playType, action) {
    switch (action.type) {
        case SET_PLAY_TYPE:
            return action.playType;
        default:
            return playType;
    }
}

const pomodoroClock = combineReducers({
    duration: combineReducers({
        session_length: changeSession,
        break_length: changeBreak
    }),
    timer: setTimer,
    isPlaying: setIsPlaying,
    isStop: setIsStop,
    playType: setPlayType
});

export default pomodoroClock;