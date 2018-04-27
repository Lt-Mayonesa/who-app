import { StyleSheet, Platform } from 'react-native';
import colors from './colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    loader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0005'
    },
    scroll: {
        flex: 1,
        paddingHorizontal: 16
    },
    bottomBar: {
        flex: 0,
        backgroundColor: 'powderblue',
        height: 48,
        flexDirection: 'row'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    messageInput: {
        flex: 0.8,
        marginLeft: 4
    },
    buttonContainer: {
        flex: 0.2,
        margin: 8
    },
    message: {
        alignSelf: 'flex-start',
        backgroundColor: 'lightgrey',
        marginBottom: 4,
        padding: 8,
    },
    'message.me': {
        alignSelf: 'flex-end',
        backgroundColor: 'lightgreen',
        marginBottom: 4,
        padding: 8,
    },
    'message.text': {
        color: 'black',
        fontWeight: 'bold'
    },
    'message.user': {
        color: '#333'
    },
    flag: {
        textAlign: 'center',
        marginBottom: 6
    },
    'flag.global': {
        fontWeight: 'bold'
    },
    'flag.local': {
    },
    backgroundOverlay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundOverlay,
    },
    modalContainer: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 106,
        minWidth: 280,
        borderRadius: 2,
        elevation: 24,
        overflow: 'hidden',
    },
    modalContainerPadding: {
        paddingTop: 24,
    },
    rowContainer: {
        height: 56,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    listItem: {
        color: 'black',
        paddingHorizontal: 24,
        paddingVertical: 16,
        fontSize: 18,
        textAlign: Platform.select({
            ios: 'center',
            android: 'left'
        })
    },
    'dialog.title': {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        marginHorizontal: 24,
        marginBottom: 20
    },
    'dialog.footer': {
        marginTop: 24,
        padding: 8,
        height: 52
    },
    'dialog.button': {
        alignSelf: 'flex-end',
        minWidth: 48
    }
});