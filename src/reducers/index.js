import { combineReducers } from 'redux';
import account from './account';
import accountInfo from './accountInfo';
import accountTrainings from './accountTrainings';

export default combineReducers({
    account,
    accountInfo,
    accountTrainings
});