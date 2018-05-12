import React, { Component } from 'react';
import {
    View,
    Modal,
    Text,
    ActivityIndicator,
    Button,
    FlatList,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import styles from '../styles';

export class ModalSelect extends Component {

    _onItemSelected(item) {
        this.props.onItemSelected(item);
    }

    _onClose() {
        this.props.onClose();
    }

    render() {
        let Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;
        return (
            <Modal
                ref='modal_cont'
                animationType="fade"
                transparent={true}
                onRequestClose={() => this._onClose()}
                visible={this.props.visible} >
                <View style={styles.backgroundOverlay}>
                    <View style={[styles.modalContainerPadding, (this.props.fullScreen ? styles.modalContainerFullScreen : styles.modalContainer)]}>
                        <Text style={styles["dialog.title"]} >{this.props.title || "Select an item"}</Text>
                        <FlatList
                            data={this.props.items}
                            keyboardShouldPersistTaps={'always'}
                            extraData={this.props.items}
                            renderItem={({ item }) => {
                                return (
                                    <Touchable
                                        onPress={() => this._onItemSelected(item)}>
                                        <View>
                                            <Text style={styles.listItem}>{item.value}</Text>
                                        </View>
                                    </Touchable>)
                            }} />
                        <View style={styles["dialog.footer"]}>
                            {this.props.showProgress && <ActivityIndicator
                                ref='loader_main'
                                size="large"
                                color="blue"
                                animating
                                style={styles["dialog.loader"]} />}
                            <View style={styles["dialog.button"]}>
                                <Button
                                    title='Close'
                                    color='red'
                                    onPress={() => this._onClose()}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}