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

export function server_setPort(value) {
    return {
        type: types.SERVER__SET_PORT,
        port: value
    };
};

export function server_setWaiting(waiting) {
    return {
        type: types.SERVER__SET_WAITING,
        waiting: waiting
    };
};

export function server_update(obj) {
    return {
        type: types.SERVER__UPDATE,
        server: obj 
    };
};