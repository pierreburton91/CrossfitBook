import React from 'react';
import { StyleSheet, View, TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class ButtonIcon extends React.Component {
    render() {
        let button;
        if (Platform.OS === 'ios') {
            button = <TouchableHighlight onPress={() => this.props.action(this.props.arguments)} >
                            <View style={[styles.button, this.props.style]}>
                                <Ionicons name={this.props.name} size={24} color='rgba(255,255,255,.54)' />
                            </View>
                        </TouchableHighlight>
        } else {
            button = <TouchableNativeFeedback onPress={() => this.props.action(this.props.arguments)} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,.25)', true)} >
                            <View style={[styles.button, this.props.style]}>
                                <Ionicons name={this.props.name} size={24} color='rgba(255,255,255,.54)' />
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
        borderRadius: 4,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center'
    }
});