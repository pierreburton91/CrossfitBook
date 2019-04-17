import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';
import colors from '../shared-styles/colors';

export default class ButtonRaised extends React.Component {

    _actionHandler() {
        this.props.action();
    }

    render() {
        let button;
        if (Platform.OS === 'ios') {
            button = <TouchableHighlight onPress={() => { !this.props.disabled ? this.props.action() : false }} >
                <View style={[styles.button, this.props.style, this.props.disabled ? styles.disabled : '']}>
                    <Text style={styles.label}>{this.props.label}</Text>
                </View>
            </TouchableHighlight>
        } else {
            button = <TouchableNativeFeedback onPress={() => { !this.props.disabled ? this.props.action() : false }} background={(!this.props.disabled) ? TouchableNativeFeedback.Ripple('rgba(0,0,0,.25)') : TouchableNativeFeedback.Ripple('transparent')} >
                <View style={[styles.button, this.props.style, this.props.disabled ? styles.disabled : '']}>
                    <Text style={styles.label}>{this.props.label}</Text>
                </View>
            </TouchableNativeFeedback>
        }
        return (
            button
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.accent,
        borderRadius: 2,
        elevation: 4,
        alignItems: 'center',
        height: 36
    },
    disabled: {
        backgroundColor: '#cccccc'
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.dark,
        textTransform: 'uppercase',
        marginStart: 16,
        marginEnd: 16,
        marginTop: 8,
        marginBottom: 8
    }
});