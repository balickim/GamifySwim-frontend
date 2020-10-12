import { CONTESTANTS } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_CONTESTANTS = { contestants: [] };

const contestants = (state = DEFAULT_CONTESTANTS, action) => {
    switch (action.type) {
        case CONTESTANTS.FETCH:
            return { ...state, status: fetchStates.fetching };
        case CONTESTANTS.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };
        case CONTESTANTS.FETCH_SUCCESS:
            return { ...state, status: fetchStates.success, message: action.message, contestants: action.contestants };
        default:
            return state;
    }
}

export default contestants;