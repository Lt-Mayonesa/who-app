import createReducer from '../lib/createReducer';
import * as types from '../actions/types';


export const server = createReducer({}, {
    [types.SERVER__SET_HOST](state, action) {
        return Object.assign({}, state, {
            host: action.host
        });
    },
    [types.SERVER__SET_NAME](state, action) {
        return Object.assign({}, state, {
            name: action.name
        });
    },
    [types.JOINED_GAME](state, action) {        
        return Object.assign({}, state, {
            players: action.payload.players
        });
    }
});