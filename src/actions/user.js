import * as types from './types';

export function setUserName(value) {    
    return {
        type: types.SET_USER_NAME,
        name: value
    };
};