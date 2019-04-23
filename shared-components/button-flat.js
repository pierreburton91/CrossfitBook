import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';
import colors from '../shared-styles/colors';

export default class ButtonFlat extends React.Component {

    render() {
        let button;
        if (Platform.OS === 'ios') {
            button = <TouchableHighlight onPress={() => { !this.props.disabled ? this.props.action() : false }} >
                <View style={[styles.button, this.props.style, this.props.disabled ? styles.disabled : '']}>
                    <Text style={styles.label}>{this.props.label}</Text>
                </View>
            </TouchableHighlight>
        } else {
            button = <TouchableNativeFeedback onPress={() => { !this.props.disabled ? this.props.action() : false }} background={(!this.props.disabled) ? TouchableNativeFeedback.Ripple('rgba(255,255,255,.25)') : TouchableNativeFeedback.Ripple('transparent')} >
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
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.accent,
        textTransform: 'uppercase',
        marginStart: 16,
        marginEnd: 16,
        marginTop: 8,
        marginBottom: 8
    },
    disabled: {
        color: '#cccccc'
    },
});