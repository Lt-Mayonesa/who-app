import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles';

class BottomBar extends Component {

	state = {
		inputValue: ''
	}

	_handleTextChange(inputValue) {
		this.props.onChangeInput(inputValue);
		this.setState({
			inputValue: inputValue
		});
	}

	_handlePressEvent() {
		this.props.onSubmit(this.state.inputValue);
		this.setState({
			inputValue: ''
		});
	}

	render() {
		return (
			<View style={styles.bottomBar}>
				<TextInput
					multiline={true}
					autoFocus={true}
					style={styles.messageInput}
					value={this.state.inputValue}
					onChangeText={(v) => this._handleTextChange(v)}
					placeholder={this.props.userName ? 'Say something' : 'Enter your name'}
				/>
				<View style={styles.buttonContainer}>
					<Button
						onPress={(v) => this._handlePressEvent(v)}
						title="SEND"
					/>
				</View>
			</View>
		);
	}
};

function mapStateToProps(state) {
	return {
		userName: state.user.name
	};
}

export default connect(mapStateToProps)(BottomBar);