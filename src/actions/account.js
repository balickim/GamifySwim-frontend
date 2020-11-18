import { ACCOUNT, ACCOUNT_TRAININGS } from './types';
import { BACKEND } from '../config';

export const fetchFromAccount = ({ endpoint, options, FETCH_TYPE, ERROR_TYPE, SUCCESS_TYPE }) => dispatch => {
    dispatch({ type: FETCH_TYPE });

    return fetch(`${BACKEND.ADDRESS}/account/${endpoint}`, options)
        .then(response => response.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({
                    type: ACCOUNT.FETCH_ERROR, message: json.message
                });
            } else {
                dispatch({
                    type: SUCCESS_TYPE, ...json
                });
            }
        })
        .catch(error => {
            dispatch({
                type: ERROR_TYPE, message: error.message
            })
        });
};

export const login = ({ username, password, shortname }) => fetchFromAccount({
    endpoint: 'login',
    options: {
        method: 'POST',
        body: JSON.stringify({ username, password, shortname }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS
});

export const logout = () => fetchFromAccount({
    endpoint: 'logout',
    options: { credentials: 'include' },
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS
});

export const fetchAuthenticated = () => fetchFromAccount({
    endpoint: 'authenticated',
    options: { credentials: 'include' },
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_AUTHENTICATED_SUCCESS
});

export const fetchTrainings = ({ limit, offset }) => fetchFromAccount({
    endpoint: 'trainings',
    options: {
        method: 'POST',
        body: JSON.stringify({ limit, offset }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: ACCOUNT_TRAININGS.FETCH,
    ERROR_TYPE: ACCOUNT_TRAININGS.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_TRAININGS.FETCH_SUCCESS
});