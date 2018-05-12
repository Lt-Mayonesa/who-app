import { combineReducers } from 'redux';
import * as messagesReducer from './messages';
import * as userReducer from './user';
import * as serverReducer from './server';
import * as gamesReducer from './games';
import * as gameReducer from './game';

export default combineReducers(Object.assign(
    userReducer,
    serverReducer,
    messagesReducer,
    gamesReducer,
    gameReducer
));