import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from '../styles';

export default class Flag extends Component {
    render() {
        return (
            <Text
                style={[
                    (this.props.global ? styles['flag.global'] : styles['flag.local']),
                    styles.flag
                ]}
            >{this.props.global ? '(g)' : ''} {this.props.text}</Text>
        );
    }
}