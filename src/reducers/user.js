import createReducer from '../lib/createReducer';
import * as types from '../actions/types';


export const user = createReducer({}, {
    [types.SET_USER_NAME](state, action) {
        return Object.assign({}, state, {
            name: action.name
        });
    },
    [types.RECEIVED_SET_NAME](state, action) {
        return Object.assign({}, state, {
            id: action.payload.secret
        });
    }
})