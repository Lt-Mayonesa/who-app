import * as actions from './actions';
import * as FlagFactory from './flag';
import * as MessageFactory from './message';

/**
 * 
 * @param {Object} payload 
 */
export function isFlag(payload) {
    return payload.type &&
        payload.type.match(new RegExp(FlagFactory.TYPE_BASE, 'gi'));
};

export function Flag(text, type, global) {
    return {
        action: actions.MESSAGE,
        payload: FlagFactory.build(text, type, global)
    };
};

export function Message(text, user) {
    return {
        action: actions.MESSAGE,
        payload: MessageFactory.build(text, user)
    };
};