import React, { Component } from 'react';
import {
    View,
    Modal,
    Text,
    Button,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform,
    BackHandler
} from 'react-native';
import styles from '../styles';

export class GameOver extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    _onClose() {
        if (this.props.onClose)
            this.props.onClose();
    }

    render() {
        let Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={() => this._onClose()}
                visible={this.props.visible} >
                <View style={[styles.modalContainerPadding, styles.modalContainerFullScreen, {backgroundColor: 'rgba(255, 255, 255, 0.7)'}]}>
                    <View style={styles["dialog.centered"]}>
                        <Text style={styles["dialog.title"]} >{this.props.title || "You got kicked out!"}</Text>
                        <Text>{this.props.caption || "Now you must wait until the game ends."}</Text>
                    </View>
                    <View style={styles["dialog.footer"]}>
                        {this.props.showProgress &&
                            <ActivityIndicator
                                ref='loader_main'
                                size="large"
                                color="blue"
                                animating
                                style={styles["dialog.loader"]} />}
                        {this.props.onClose &&
                            <View style={styles["dialog.button"]}>
                                <Button
                                    title='Close'
                                    color='red'
                                    onPress={() => this._onClose()}
                                />
                            </View>}
                    </View>
                </View>
            </Modal>
        )
    }
}