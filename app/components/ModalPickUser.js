import React, { Component } from 'react';
import { View, Text, Button, FlatList, TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';
import styles from '../styles';

export default class ModalPickUser extends Component {

    _onItemSelected(item) {
        this.props.onItemSelected(this.props.ip, item.value);
    }

    _onClose() {
        this.props.onClose();
    }

    render() {
        let Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;
        return (
            <View style={styles.backgroundOverlay}>
                <View style={[styles.modalContainerPadding, styles.modalContainer]}>
                    <Text style={styles["dialog.title"]} >Have you guessed the sender?</Text>
                    <FlatList
                        data={this.props.names.map(name => {
                            return {
                                key: name,
                                value: name
                            }
                        })}
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
                        <View style={styles["dialog.button"]}>
                            <Button
                                title='Close'
                                color='indianred'
                                onPress={() => this._onClose()}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}