import * as MessageActions from './messages';
import * as UserAction from './user';
import * as ServerAction from './server';

export const ActionCreators = Object.assign({},
    MessageActions,
    UserAction,
    ServerAction
);