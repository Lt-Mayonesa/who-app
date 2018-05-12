import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';
import styles from '../styles';

export class Message extends Component {

	_onPress() {
		this.props.onPressItem(this);
	}

	render() {
		let Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;
		return (
			<Touchable
				onPress={() => this._onPress()}
				disabled={this.props.isMine} 
				>
				<View style={this.props.isMine ? styles['message.me'] : styles.message}>
					<Text style={styles["message.user"]}>{this.props.isMine ? 'Me' : this.props.user}</Text>
					<Text style={styles["message.text"]}>{this.props.text} </Text>
				</View>
			</Touchable >
		);
	}
}