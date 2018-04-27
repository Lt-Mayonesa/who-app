import * as types from './types';

export function server_setHost(value) {    
    return {
        type: types.SERVER__SET_HOST,
        host: value
    };
};

export function server_setName(value) {
    return {
        type: types.SERVER__SET_NAME,
        name: value
    };
};