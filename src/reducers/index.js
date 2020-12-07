import { combineReducers } from 'redux';
import account from './account';
import accountInfo from './accountInfo';
import accountTrainings from './accountTrainings';
import contestants from './contestants';
import contestantInfo from './contestantInfo';
import trainer from './trainer';

export default combineReducers({
    account,
    accountInfo,
    accountTrainings,
    contestants,
    contestantInfo,
    trainer
});