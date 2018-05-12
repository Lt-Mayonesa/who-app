import * as MessageActions from './messages';
import * as UserAction from './user';
import * as ServerAction from './server';
import * as GamesActions from './games';
import * as GameActions from './game';

export const ActionCreators = Object.assign({},
    MessageActions,
    UserAction,
    ServerAction,
    GamesActions,
    GameActions
);