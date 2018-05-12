import createReducer from '../lib/createReducer';
import * as types from '../actions/types';


export const games = createReducer({}, {
    [types.GAMES__ADD](state, action) {
        
        function fixItem(collection, item) {
            let newCollection = [...collection];
            let indexOfAmendedItem =
                state.map(each => { return each.host }).indexOf(item.host);
            if (indexOfAmendedItem !== -1) {
                newCollection = [
                    ...newCollection.slice(0, indexOfAmendedItem),
                    item,
                    ...newCollection.slice(indexOfAmendedItem + 1)
                ];
            } else {
                newCollection.unshift(item);
            }
            return newCollection;
        }

        let newState = [];
        if (Array.isArray(action.data)) {
            action.data.forEach(game => {
                newState = fixItem(state, game);
            });
        } else {
            newState = fixItem(state, action.data);
        }
        return newState;
    }
});