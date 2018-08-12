import { connect } from 'react-redux';
import PomodoroClock from './../presentational/PomodoroClock';
import {
    increaseSession, increaseBreak, decreaseSession, decreaseBreak, setIsPlaying, setIsResume, setPlayType, setTimer
} from './../../redux/actionCreators';


const mapStateToProps = (state, ownProps) => {
    return {
        session_length: state.duration.session_length,
        break_length: state.duration.break_length,
        timer: state.timer,
        playType: state.playType,
        isPlaying: state.isPlaying,
        isResume: state.isResume
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        "increaseSession": () => dispatch(increaseSession()),
        "decreaseSession": () => dispatch(decreaseSession()),
        "increaseBreak": () => dispatch(increaseBreak()),
        "decreaseBreak": () => dispatch(decreaseBreak()),
        "setIsPlaying": (isPlaying) => dispatch(setIsPlaying(isPlaying)),
        "setIsResume": (isResume) => dispatch(setIsResume(isResume)),
        "setPlayType": (playType) => dispatch(setPlayType(playType)),
        "setTimer": (timer) => dispatch(setTimer(timer))
    }
}

const PomodoroClockContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PomodoroClock);

export default PomodoroClockContainer;
