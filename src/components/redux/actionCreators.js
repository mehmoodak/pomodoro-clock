import {
    INCREASE_SESSION, DECREASE_SESSION, INCREASE_BREAK, DECREASE_BREAK, RESET, SET_TIMER, SET_IS_PLAYING, SET_IS_RESUME, SET_PLAY_TYPE
} from './actionTypes';

export function increaseSession() {
    return {
        type: INCREASE_SESSION
    }
}

export function decreaseSession() {
    return {
        type: DECREASE_SESSION
    }
}

export function increaseBreak() {
    return {
        type: INCREASE_BREAK
    }
}

export function decreaseBreak() {
    return {
        type: DECREASE_BREAK
    }
}

export function reset() {
    return {
        type: RESET
    }
}

export function setTimer(timer){
    return {
        type: SET_TIMER,
        timer
    }
}

export function setIsPlaying(isPlaying){
    return {
        type: SET_IS_PLAYING,
        isPlaying,
    }
}

export function setIsResume(isResume){
    return {
        type: SET_IS_RESUME,
        isResume
    }
}

export function setPlayType(playType){
    return{
        type: SET_PLAY_TYPE,
        playType
    }
}