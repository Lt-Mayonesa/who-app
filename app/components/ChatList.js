import React from 'react';
import { FlatList } from 'react-native';
import styles from '../styles';

/**
 * We extend FlatList so we can scroll on update
 */
export default class ChatList extends FlatList {

    /**
     * Scroll to end of list when updated
     * we add a small timeout so last item added is taken into consideration.
     * 
     * @param {Object} prevProps 
     * @param {Object} prevState 
     */
    componentDidUpdate(prevProps, prevState) {
        setTimeout(() => {
            this.scrollToEnd();
        }, 20);
    }
}