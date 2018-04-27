import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './src/reducers';
import { createLogger } from 'redux-logger';
import * as types from './src/actions/types';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            loggerMiddleware
        )
    );
    return createStore(reducers, initialState, enhancer);
}

const store = configureStore({
    user: {},
    messages: []
});

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('Who', () => Root);