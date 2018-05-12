import createReducer from '../lib/createReducer';
import * as types from '../actions/types';


export const messages = createReducer({}, {
    [types.RECEIVED_MESSAGE](state, action) {        
        let newState = [...state]; 
        newState.push(action.payload);
        return newState;
    },
    [types.JOINED_GAME](state, action) {
        let newState = [...state];
        action.payload.value = `${action.payload.value} joined the game`;
        action.payload.global = true;
        delete action.payload.user;
        newState.push(action.payload);
        return newState;
    },
    [types.RECEIVED_GUESS](state, action) {        
        let newState = [...state];
        action.payload.global = true;
        if (action.payload.correct) {
            action.payload.value = `${action.payload.name} got kicked out by ${action.payload.user}`;
        } else {
            action.payload.value = `${action.payload.user} tried to guess for ${action.payload.name} and failed`;
        }
        delete action.payload.user;
        newState.push(action.payload);
        return newState;
    },
    [types.ADD_MESSAGES](state, action) {
        return action.messages || state;
    }
});