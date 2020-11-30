import { ACCOUNT } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ACCOUNT = { loggedIn: false, roleId: null };

const account = (state = DEFAULT_ACCOUNT, action) => {
    switch (action.type) {
        case ACCOUNT.FETCH:
            return { ...state, status: fetchStates.fetching };
        case ACCOUNT.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message }
        case ACCOUNT.ADD_SUCCESS:
            return { ...state, status: fetchStates.success, message: action.message };
        case ACCOUNT.FETCH_SUCCESS:
            return { ...state, status: fetchStates.success, message: action.message, roleId: action.roleId, loggedIn: true};
        case ACCOUNT.FETCH_LOGOUT_SUCCESS:
            return { ...state, status: fetchStates.success, message: action.message, roleId: roleId, loggedIn: false};
        case ACCOUNT.FETCH_AUTHENTICATED_SUCCESS:
            return { ...state, status: fetchStates.success, message: action.message, roleId: action.roleId, loggedIn: action.authenticated};
        default:
            return state;
    }
};

export default account;