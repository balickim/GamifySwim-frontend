import { CONTESTANT_INFO } from '../actions/types';
import fetchStates from './fetchStates';

const contestantInfo = (state = {}, action) => {
    switch (action.type) {
        case CONTESTANT_INFO.FETCH:
            return { ...state, status: fetchStates.fetching };
        case CONTESTANT_INFO.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };
        case CONTESTANT_INFO.FETCH_SUCCESS:
            return { ...state, status: fetchStates.success, message: action.message, ...action.info };
        default:
            return state;
    }
}

export default contestantInfo;