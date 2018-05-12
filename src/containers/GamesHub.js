import React, { Component } from 'react';
import { View, TextInput, Button, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import styles from '../styles';
import Zeroconf from 'react-native-zeroconf';
import { ModalSelect } from '../components';

const server = NativeModules.ServerHandler;

class GamesHub extends Component {

    zeroconf = null;

    constructor() {
        super();
        this.zeroconf = new Zeroconf();
        this.zeroconf.on('start', () => console.log('started '));
        this.zeroconf.on('resolved', (service) => {
            let services = this.zeroconf.getServices();
            console.log('services', services);
            
            this.props.games_addGame(Object.keys(services).map(key => {
                return services[key];
            }));
        });
        this.zeroconf.on('error', (e) => console.log('The scan errored:', e));
    }

    componentDidMount() {
        this.props.games_addGame({
            name: 'Create new game',
            host: 'create_new_game',
            port: 'new'
        })
        this.zeroconf.scan(server.PROTOCOL);
    }

    componentWillUnmount() {
        this.zeroconf.stop();
    }

    _startServer(name) {
        NativeModules.ServerHandler.start(name).then((result) => {
            this.props.server_update({
                name: name,
                port: result,
                host: 'localhost'
            });
            this.props.onClose();
        }).catch((e) => {
            console.log(e);
        });
    }

    _onItemSelectedHandler(item) {
        if (item.host === 'create_new_game') {
            // create a server
            this._startServer(this.props.user);
        } else {
            this.props.server_update(item);
            this.props.onClose();
        }
    }

    render() {
        return (
            <ModalSelect
                fullScreen
                visible
                showProgress
                title='Join game (searching...)'
                items={this.props.games.map((game) => {
                    return {
                        ...game,
                        key: `${game.host}:${game.port}`,
                        value: game.name
                    }
                })}
                onItemSelected={(item) => this._onItemSelectedHandler(item)}
                onClose={() => this.props.onClose()} />
        );
    }
};

/**
 * Map Redux Actions to this.props
 * 
 * @param {Function} dispatch 
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        user: state.user.name,
        games: state.games,
        server: state.server
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesHub);