import { TRAINER } from './types';
import { BACKEND } from '../config';

export const fetchFromTrainer = ({ endpoint, options, FETCH_TYPE, ERROR_TYPE, SUCCESS_TYPE }) => dispatch => {
    dispatch({ type: FETCH_TYPE });

    return fetch(`${BACKEND.ADDRESS}/trainer/${endpoint}`, options)
        .then(response => response.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({
                    type: TRAINER.FETCH_ERROR, message: json.message
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

export const addTraining = ({ pool_id, coach_user_id, trainingdatestart, trainingdatestop, title, description, deleted }) => fetchFromTrainer({
    endpoint: 'training',
    options: {
        method: 'POST',
        body: JSON.stringify({ pool_id, coach_user_id, trainingdatestart, trainingdatestop, title, description, deleted }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: TRAINER.FETCH,
    ERROR_TYPE: TRAINER.FETCH_ERROR,
    SUCCESS_TYPE: TRAINER.FETCH_SUCCESS
});

export const addPool = ({ title, description, width, length, depth, deleted }) => fetchFromTrainer({
    endpoint: 'pool',
    options: {
        method: 'POST',
        body: JSON.stringify({ title, description, width, length, depth, deleted }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: TRAINER.FETCH,
    ERROR_TYPE: TRAINER.FETCH_ERROR,
    SUCCESS_TYPE: TRAINER.FETCH_SUCCESS
});

export const addSwimmingStyle = ({ title, description, deleted }) => fetchFromTrainer({
    endpoint: 'swimmingstyle',
    options: {
        method: 'POST',
        body: JSON.stringify({ title, description, deleted }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: TRAINER.FETCH,
    ERROR_TYPE: TRAINER.FETCH_ERROR,
    SUCCESS_TYPE: TRAINER.FETCH_SUCCESS
});

export const addUserTrainingPlan = ({ id, swimmingstyle_id, title, description, repetitions, breakseconds, length, deleted }) => fetchFromTrainer({
    endpoint: 'usertrainingplan',
    options: {
        method: 'POST',
        body: JSON.stringify({ id, swimmingstyle_id, title, description, repetitions, breakseconds, length, deleted }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: TRAINER.FETCH,
    ERROR_TYPE: TRAINER.FETCH_ERROR,
    SUCCESS_TYPE: TRAINER.FETCH_SUCCESS
});

export const addUserTrainingPlans = ({ id }) => fetchFromTrainer({
    endpoint: 'usertrainingplans',
    options: {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: TRAINER.FETCH,
    ERROR_TYPE: TRAINER.FETCH_ERROR,
    SUCCESS_TYPE: TRAINER.FETCH_SUCCESS
});

export const addTrainingPlan = ({ title, description, deleted }) => fetchFromTrainer({
    endpoint: 'accounttrainingplan',
    options: {
        method: 'POST',
        body: JSON.stringify({ title, description, deleted }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: TRAINER.FETCH,
    ERROR_TYPE: TRAINER.FETCH_ERROR,
    SUCCESS_TYPE: TRAINER.FETCH_SUCCESS
});

export const addTrainingPlanEntry = ({ id, swimmingstyle_id, repetitions, breakseconds, length, order }) => fetchFromTrainer({
    endpoint: 'trainingplanentry',
    options: {
        method: 'POST',
        body: JSON.stringify({ id, swimmingstyle_id, repetitions, breakseconds, length, order }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: TRAINER.FETCH,
    ERROR_TYPE: TRAINER.FETCH_ERROR,
    SUCCESS_TYPE: TRAINER.FETCH_SUCCESS
});