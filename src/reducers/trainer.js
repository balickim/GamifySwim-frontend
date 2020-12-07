import { TRAINER } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_TRAINER = {};

const trainer = (state = DEFAULT_TRAINER, action) => {
    switch (action.type) {
        case TRAINER.FETCH:
            return { ...state, status: fetchStates.fetching };
        case TRAINER.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message }
        case TRAINER.FETCH_SUCCESS:
            return { ...state, status: fetchStates.success, message: action.message, roleId: action.roleId, loggedIn: true};
        default:
            return state;
    }
};

export default trainer;