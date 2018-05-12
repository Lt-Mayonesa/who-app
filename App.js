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
	ActivityIndicator
} from 'react-native';
import { ChatList, Message, Flag, ModalSelect, GameOver } from './src/components';
import BottomBar from './src/containers/BottomBar';
import GamesHub from './src/containers/GamesHub';
import styles from './src/styles';

class App extends Component {

	room = null;

	state = {
		modalVisible: true,
		modal: null,
		isExpectingServerName: false,
		isExpectingUserName: false,
		isNameJustSet: false,
		loading: false
	}

	componentDidMount() {
		if (!this.props.user.name)
			this.props.newMessage(
				Payloads.Flag('Welcome to the fun! Please enter your name :D'));
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.isNameJustSet) {
			this.joinRoom();
			this.setState({
				isNameJustSet: false
			});
		} else if (this.props.server.waiting) {
			this.joinRoom();
		}
	}

	_searchServer() {
		this._showHub();
		// setTimeout(() => {
		// 	this.setState({
		// 		loading: false
		// 	});
		// 	//this.joinRoom();
		// 	// found
		// 	Alert.alert(
		// 		'No games found',
		// 		'We did not found games running on this LAN ¿Would you like to start a game?',
		// 		[
		// 			{ text: 'No', onPress: () => console.log('no pressed'), style: 'cancel' },
		// 			{ text: 'Yes', onPress: () => this._startServer() }
		// 		]
		// 	);
		// }, 2000);
	}

	/**
	 * Handles BottomBar submit event
	 * 
	 * @param {string} inputValue the value of the input field
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
						this.props.server_setHost(`ws://${inputValue[1]}`);
						this.joinRoom();
						break;
					case 'scan':
						this.zeroconf.scan(NativeModules.ServerHandler.PROTOCOL);
						break;
					case 'hub':
						if (this.state.hubVisible)
							this._hideHub();
						else
							this._showHub();
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
	 * @param {Message} message
	 */
	_handleItemPress(message) {
		this.setState({
			ipToGuess: message.props.secret
		});
		this._showGuess();
	}

	_handleNameSelected(name) {
		if (this.room && this.state.ipToGuess) {
			this.room.guess(this.state.ipToGuess, name);
			this.setState({
				ipToGuess: null
			});
		}
		this._hideGuess();
	}

	joinRoom() {
		if (this.props.user.name) {
			if (this.props.server.host) {
				if (this.room)
					this.room.invalidate();
				this.props.server_setWaiting(false);
				this.room = new RoomWS(
					`ws://${this.props.server.host}:${this.props.server.port}`,
					this.props.user.name,
					this.props.newMessage);
			} else {
				this._searchServer();
			}
		} else {
			this.props.newMessage(
				Payloads.Flag('Please enter your name and hit SEND.'));
		}
	}

	_showGuess() {
		this.setState({
			guessVisible: true
		});
	}

	_hideGuess() {
		this.setState({
			guessVisible: false
		});
	}

	_showHub() {
		this.setState({
			hubVisible: true
		});
	}
	_hideHub() {
		this.setState({
			hubVisible: false
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
					onSubmit={(value) => this._handleSubmit(value)} />
				{this.state.hubVisible &&
					<GamesHub
						onClose={() => this._hideHub()}
					/>}
				{this.state.guessVisible &&
					<ModalSelect
						visible
						title='Have you guessed the sender?'
						items={this.props.game.players.map((player, index) => {
							return {
								key: index.toString(),
								value: player.name
							};
						})}
						onItemSelected={(item) => this._handleNameSelected(item.value)}
						onClose={() => this._hideGuess()} />}
				{this.props.game.kickedOut &&
					<GameOver visible />}
				{this.props.game.won &&
					<GameOver 
					visible
					title="You Won!"
					caption={this.props.game.kickedOut ? "And in the last second!" : "You feel confident and full of life."}
					onClose={() => {
						this.props.game__restart();
					}} />}
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
		game: state.game,
		server: state.server,
		user: state.user,
		messages: state.messages,
		games: state.games
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);