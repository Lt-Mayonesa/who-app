import * as types from './types';

export function games_addGame(data) {
    return {
        type: types.GAMES__ADD,
        data: data 
    };
};