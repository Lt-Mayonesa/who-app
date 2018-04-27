/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from './src/actions';
import RoomWS from './src/lib/websocket';
import * as Payloads from './src/payloads';
import {
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
	ScrollView,
	Button,
	NativeModules,
	Alert,
	ActivityIndicator,
	Modal
} from 'react-native';
import { ChatList, Message, Flag, ModalPickUser } from './src/components';
import BottomBar from './src/containers/BottomBar';
import styles from './src/styles';
import Zeroconf from 'react-native-zeroconf';

class App extends Component {

	zeroconf = null;
	room = null;

	constructor() {
		super();
		this.zeroconf = new Zeroconf();
		this.zeroconf.on('start', () => console.log('The scan has started'));
		this.zeroconf.on('stop', () => console.log('The scan has stoped'));
		this.zeroconf.on('found', (name) => console.log('The scan has found something:', name));
		this.zeroconf.on('resolved', (a,b) => {
			console.log('The scan has resolved', a, b);
			console.log('services', this.zeroconf.getServices());
		});
		this.zeroconf.on('error', (e) => console.log('The scan errored:', e));
		this.zeroconf.on('update', () => console.log('The scan has updated'));
		this.zeroconf.on('remove', (a,b) => console.log('The scan has removed', a, b));
	}

	state = {
		modalVisible: false,
		modalContent: null,
		isExpectingServerName: false,
		isExpectingUserName: false,
		isNameJustSet: false,
		loading: true
	}

	componentDidMount() {
		if (!this.props.server.name)
			this._searchServer();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.isNameJustSet) {
			this.joinRoom();
			this.setState({
				isNameJustSet: false
			});
		}
	}

	_searchServer() {
		this.setState({
			loading: true
		});
		this.props.server_setHost(`ws://192.168.1.130:63111`);
		setTimeout(() => {
			this.setState({
				loading: false
			});
			//this.joinRoom();
			// found
			Alert.alert(
				'No games found',
				'We did not found games running on this LAN ¿Would you like to start a game?',
				[
					{ text: 'No', onPress: () => console.log('no pressed'), style: 'cancel' },
					{ text: 'Yes', onPress: () => this._startServer('Default') }
				]
			);
		}, 500);
	}

	_startServer(name) {
		name = name || this.props.server.name;
		if (!name) {
			this.props.newMessage(
				Payloads.Flag(`Please enter a name for your game and hit SEND`));
			this.setState({
				isExpectingServerName: true
			});
		} else {
			NativeModules.ServerHandler.start(name).then((result) => {
				this.props.server_setName(name);
				this.props.server_setHost(`ws://localhost:${result}`);
				this.setState({
					isExpectingServerName: false
				});
				this.joinRoom();
			}).catch((e) => {
				console.log(e);
			});
		}
	}

	/**
	 * 
	 * @param {String} value contents of TextInput
	 */
	_handleInputChange(value) {
		//this.props.changeInput(value);
	}

	/**
	 * Handle button touch event
	 */
	_handleSubmit(inputValue) {
		if (inputValue !== '') {
			if (inputValue.indexOf('/') === 0) {
				// it's a command
				inputValue = inputValue.slice(1).split(' ');
				switch (inputValue[0]) {
					case 'start':
						this._startServer(inputValue[1]);
						break;
					case 'stop':
						NativeModules.ServerHandler.stop().then((stopped) => {
							this.props.newMessage(
								Payloads.Flag(`Server was ${stopped ? 'running' : 'not running'} and is stopped.`));
						});
						break;
					case 'connect':
						this.props.server_setHost(`ws://${inputValue[1]}:63111`);
						this.joinRoom();
						break;
					case 'scan':
						console.log(NativeModules.ServerHandler.PROTOCOL);
						this.zeroconf.scan(NativeModules.ServerHandler.PROTOCOL);
						break;
					default:
						Payloads.Flag(`Unknown command: '${inputValue[0]}'`);
				}
			} else {
				if (this.state.isExpectingServerName) {
					this._startServer(inputValue);
				} else if (!this.props.user.name || this.state.isExpectingUserName) {
					this.setState({
						isNameJustSet: true
					});
					this.props.setUserName(inputValue);
					this.props.newMessage(
						Payloads.Flag('Your name is set.', false));
				} else {
					if (this.room)
						this.room.message(inputValue);
				}
			}
		}
	}

	/**
	 * Pressed!
	 * 
	 * @param {Message} item 
	 */
	_handleItemPress(item, name) {
		if (!name) {
			this._showModal(<ModalPickUser
				ip={item.props.secret}
				names={this.props.server.players}
				onItemSelected={(ip, name) => this._handleItemPress(ip, name)}
				onClose={() => this._hideModal()}
			/>);
		} else {
			if (this.room)
				this.room.guess(item, name);
			this._hideModal();
		}
	}

	joinRoom() {
		if (this.props.user.name) {
			if (this.props.server.host) {
				if (this.room)
					this.room.invalidate();
				this.room = new RoomWS(this.props.server.host, this.props.user.name, this.props.newMessage);
			} else {
				this.props.newMessage(
					Payloads.Flag('No host. Searching...'));
				this._searchServer();
			}
		} else {
			this.props.newMessage(
				Payloads.Flag('Please enter your name and hit SEND.'));
		}
	}

	_showModal(content) {
		this.setState({
			modalVisible: true,
			modalContent: content
		});
	}

	_hideModal() {
		this.setState({
			modalVisible: false,
			modalContent: null
		});
	}


	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Who!
					</Text>
				<ChatList
					ref='list_chats'
					style={styles.scroll}
					data={this.props.messages}
					extraData={this.props.messages}
					keyboardShouldPersistTaps={'always'}
					renderItem={({ item }) => {
						if (Payloads.isFlag(item))
							return <Flag
								global={item.global}
								text={item.value} />
						return <Message
							{...item}
							isMine={item.secret === this.props.user.id}
							onPressItem={(item) => this._handleItemPress(item)} />
					}}
				/>
				<BottomBar
					onChangeInput={(value) => this._handleInputChange(value)}
					onSubmit={(value) => this._handleSubmit(value)} />
				<Modal
					animationType="slide"
					transparent={true}
					onRequestClose={() => this._hideModal()}
					visible={this.state.modalVisible} >
					{this.state.modalContent}
				</Modal>
				{this.state.loading && <ActivityIndicator
					ref='loader_main'
					size="large"
					color="powderblue"
					animating={this.state.loading}
					style={styles.loader} />}
			</View>
		);
	}
}

/**
 * Map Redux Actions to this.props
 * 
 * @param {Function} dispatch 
 */
function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

/**
 * Map returned properties to this.props
 * This triggers a render() when values change
 * 
 * @param {Object} state 
 */
function mapStateToProps(state) {
	return {
		server: state.server,
		user: state.user,
		messages: state.messages
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);