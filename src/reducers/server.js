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
    [types.SERVER__SET_PORT](state, action) {
        return Object.assign({}, state, {
            port: action.port
        });
    },
    [types.SERVER__SET_WAITING](state, action) {
        return Object.assign({}, state, {
            waiting: action.waiting
        })
    },
    [types.SERVER__UPDATE](state, action) {
        return {
            name: action.server.name,
            host: action.server.host,
            port: action.server.port,
            waiting: true
        };
    }
});