import * as types from './types';
import * as actions from '../payloads/actions';

export function newMessage(packet) {
    if (packet.action === actions.RECEIVED_NAME) {
        return {
            type: types.RECEIVED_SET_NAME,
            payload: packet.payload
        };
    } else if (packet.action === actions.JOIN) {
        return {
            type: types.JOINED_GAME,
            payload: packet.payload
        }
    } else if (packet.action === actions.GUESS) {
        return {
            type: types.RECEIVED_GUESS,
            payload: packet.payload
        };
    } else {
        return {
            type: types.RECEIVED_MESSAGE,
            payload: packet.payload
        };
    }
};

export function addMessages(messages) {
    return {
        type: types.ADD_MESSAGES,
        messages: messages
    };
};