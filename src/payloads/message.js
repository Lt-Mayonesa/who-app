export const TYPE_BASE = "MESSAGE";

/**
 * Returns a Message payload object
 * 
 * @param {string} text 
 * @returns {Object} payload
 */
export function build(text, user) {
    return {
        key: (new Date()).getTime().toString(),
        type: TYPE_BASE,
        value: text,
        user: user || 'Anon'
    };
}