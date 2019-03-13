import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';

export default class ButtonFlat extends React.Component {
    render() {
        let button;
        if (Platform.OS === 'ios') {
            button = <TouchableHighlight onPress={() => this.props.action(this.props.arguments)} >
                        <View style={[styles.button, this.props.style]}>
                            <Text style={styles.label}>{this.props.label}</Text>
                        </View>
                        </TouchableHighlight>
        } else {
            button = <TouchableNativeFeedback onPress={() => this.props.action(this.props.arguments)} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,.25)')} > 
                        <View style={[styles.button, this.props.style]}>
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
        borderRadius: 4
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#EEFF41',
        textTransform: 'uppercase',
        marginStart: 16,
        marginEnd: 16,
        marginTop: 8,
        marginBottom: 8
    }
});