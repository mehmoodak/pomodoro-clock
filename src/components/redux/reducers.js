import { combineReducers } from 'redux';
import {
    INCREASE_SESSION, INCREASE_BREAK, DECREASE_SESSION, DECREASE_BREAK, RESET, SET_TIMER, SET_IS_PLAYING, SET_IS_RESUME, SET_PLAY_TYPE
} from './actionTypes';


const initialState = {
    duration: {
        session_length: 25,
        break_length: 5
    },
    timer: {
        minutes: 25,
        seconds: 0
    },
    isPlaying: false,
    isResume: false,
    playType: 'session'
}

function changeSession(state = initialState.duration.session_length, action) {
    switch (action.type) {
        case INCREASE_SESSION:
            return Object.assign({}, state, {
                duration: {
                    session_length: state.duration.session_length + 1,
                    break_length: state.duration.break_length
                }
            });
        case DECREASE_SESSION:
            if (state.duration.session_length > 1) {
                return Object.assign({}, state, {
                    duration: {
                        session_length: state.duration.session_length - 1,
                        break_length: state.duration.break_length
                    }
                });
            } else {
                return state;
            }
        default:
            return state;
    }
}

function changeBreak(state = initialState.duration.break_length, action) {
    switch (action.type) {
        case INCREASE_BREAK:
            return Object.assign({}, state, {
                duration: {
                    session_length: state.duration.session_length,
                    break_length: state.duration.break_length + 1
                }
            });
        case DECREASE_BREAK:
            if (state.duration.break_length > 1) {
                return Object.assign({}, state, {
                    duration: {
                        session_length: state.duration.session_length,
                        break_length: state.duration.break_length - 1
                    }
                });
            } else {
                return state;
            }
        default:
            return state;
    }
}

function setTimer(state = initialState.timer, action) {
    switch (action.type) {
        case SET_TIMER:
            return Object.assign({}, state, {
                timer: action.timer
            });
        default:
            return state;
    }
}

function setIsPlaying(state = initialState.isPlaying, action) {
    switch (action.type) {
        case SET_IS_PLAYING:
            return Object.assign({}, state, {
                isPlaying: action.isPlaying
            });
        default:
            return state;
    }
}

function setIsResume(state = initialState.isResume, action) {
    switch (action.type) {
        case SET_IS_RESUME:
            return Object.assign({}, state, {
                isResume: action.isResume
            });
        default:
            return state;
    }
}

function setPlayType(state = initialState.playType, action) {
    switch (action.type) {
        case SET_PLAY_TYPE:
            return Object.assign({}, state, {
                playType: action.playType
            });
        default:
            return state;
    }
}

function reset(state = initialState, action) {
    switch (action.type) {
        case RESET:
            return Object.assign({}, state, {
                timer: {
                    minutes: state.duration.session_length,
                    seconds: 0
                }
            });
        default:
            return state;
    }
}

const pomodoroClock = combineReducers({
    duration : combineReducers({
        session_length: changeSession,
        break_length: changeBreak
    }),
    timer: setTimer,
    isPlaying: setIsPlaying,
    isResume: setIsResume,
    playType: setPlayType
});

export default pomodoroClock;