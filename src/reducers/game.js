import createReducer from "../lib/createReducer";
import * as types from "../actions/types";

export const game = createReducer({}, {
    [types.GAME__START](state, action) {
        return Object.assign({}, state, {
            name: action.name
        });
    },
    [types.RECEIVED_SET_NAME](state, action) {
        return Object.assign({}, state, {
            name: action.payload.value
        });
    },
    [types.JOINED_GAME](state, action) {
        return Object.assign({}, state, {
            players: action.payload.players
        });
    },
    [types.RECEIVED_GUESS](state, action) {
        let ko = action.payload.correct && state.name === action.payload.name;
        return Object.assign({}, state, {
            kickedOut: ko,
            won: !ko && action.payload.playersLeft === 1
        });
    },
    [types.GAME__RESTART](state, action) {
        return {};
    }
});