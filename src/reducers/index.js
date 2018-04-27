import { combineReducers } from 'redux';
import * as messagesReducer from './messages';
import * as userReducer from './user';
import * as serverReducer from './server';

export default combineReducers(Object.assign(
    userReducer,
    serverReducer,
    messagesReducer
));