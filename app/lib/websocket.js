import * as Payloads from '../payloads';
import * as actions from '../payloads/actions';

export default class ChatWebSocket extends WebSocket {
    messageHandler = null;
    name = 'Anonymous';
    /**
     * 
     * 
     * @param {String} uri endpoint to connect to
     * @param {String} name the name of the user
     * @param {Function} handler function to handle when a message is recived
     */
    constructor(uri, name, handler) {
        super(uri);
        this.messageHandler = handler;
        this.name = name;
        this.onopen = this.__onopen;
        this.onmessage = this.__onmessage;
        this.onerror = this.__onerror;
        this.onclose = this.__onclose;
    }

    sendJSON(obj) {
        this.send(JSON.stringify(obj));
    }

    guess(ip, name) {
        this.sendJSON({
            action: actions.GUESS,
            payload: {
                ip: ip,
                name: name
            }
        });
    }

    message(text) {
        this.sendJSON({
            action: actions.MESSAGE,
            payload: {
                text: text
            }
        });
    }

    join(name) {
        this.sendJSON({
            action: actions.JOIN,
            payload: {
                value: name
            }
        });
    }

    /**
     * Work arround due to react-native v0.5.2 WebSocket.close crashing app
     * see https://github.com/facebook/react-native/issues/18696
     */
    invalidate() {
        this.messageHandler = () => { }; //stub
        this.onopen = this.messageHandler;
        this.onmessage = this.messageHandler;
        this.onerror = this.messageHandler;
        this.onclose = this.messageHandler;
    }

    __onopen() {
        // connection opened
        this.join(this.name);
    }

    __onmessage(e) {
        // a message was received
        try {
            this.messageHandler(JSON.parse(e.data));
        } catch (e) {
            this.messageHandler(Payloads.Flag('We received a message we do not understand'));
            console.warn(e);
        }
    }

    __onerror(e) {
        // an error occurred
        console.log('web socker error:', e);
        this.messageHandler(Payloads.Flag(`An error occurred: ${e.message}`, Payloads.TYPE_ERROR));
    }

    __onclose(e) {
        // connection closed
        console.log('web socker closed:', e);
        this.messageHandler(Payloads.Flag(`Connection closed (${e.code}): ${e.reason}`, Payloads.TYPE_ERROR));
    }
}