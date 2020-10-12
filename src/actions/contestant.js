import { CONTESTANTS, CONTESTANT_INFO } from './types';
import { BACKEND } from '../config';

export const fetchFromContestant = ({ endpoint, options, FETCH_TYPE, ERROR_TYPE, SUCCESS_TYPE }) => dispatch => {
    dispatch({ type: FETCH_TYPE });

    return fetch(`${BACKEND.ADDRESS}/contestant/${endpoint}`, options)
        .then(response => response.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({
                    type: CONTESTANTS.FETCH_ERROR, message: json.message
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

export const fetchContestants = ({ limit, offset }) => fetchFromContestant({
    endpoint: 'contestants',
    options: {
        method: 'POST',
        body: JSON.stringify({ limit, offset }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: CONTESTANTS.FETCH,
    ERROR_TYPE: CONTESTANTS.FETCH_ERROR,
    SUCCESS_TYPE: CONTESTANTS.FETCH_SUCCESS
});

export const fetchContestantInfo = ( id ) => fetchFromContestant({
    endpoint: 'info',
    options: {
        method: 'POST',
        body: JSON.stringify({id}),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: CONTESTANT_INFO.FETCH,
    ERROR_TYPE: CONTESTANT_INFO.FETCH_ERROR,
    SUCCESS_TYPE: CONTESTANT_INFO.FETCH_SUCCESS
});