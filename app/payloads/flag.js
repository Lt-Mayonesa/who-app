export const TYPE_BASE = 'FLAG';
export const TYPE_DEFAULT = 'DEFAULT';
export const TYPE_OK = 'OK';
export const TYPE_ERROR = 'ERROR';

/**
 * Returns a Flag payload object
 * 
 * @param {string} text 
 * @param {string} type 
 * @param {boolean} global 
 */
export function build(text, type, global) {
    if (typeof type === 'boolean') {
        global = type;
        type = TYPE_DEFAULT;
    }
    return {
        key: (new Date()).getTime().toString(),
        type: `${TYPE_BASE}:${type || TYPE_DEFAULT}`,
        global: global || false,
        value: text
    };
}