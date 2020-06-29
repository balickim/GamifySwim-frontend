import { ACCOUNT_TRAININGS } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ACCOUNT_TRAININGS = { trainings: [] };

const accountTrainings = (state = DEFAULT_ACCOUNT_TRAININGS, action) => {
    switch (action.type) {
        case ACCOUNT_TRAININGS.FETCH:
            return { ...state, status: fetchStates.fetching };
        case ACCOUNT_TRAININGS.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };
        case ACCOUNT_TRAININGS.FETCH_SUCCESS:
            return { ...state, status: fetchStates.success, message: action.message, trainings: action.trainings };
        default:
            return state;
    }
}

export default accountTrainings;