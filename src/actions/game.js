import * as types from './types';

export function game__start(data) {
    return {
        type: types.GAME__START,
        name: data
    };
};

export function game__restart() {
    return {
        type: types.GAME__RESTART
    };
};