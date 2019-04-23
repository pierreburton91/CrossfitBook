import React from 'react';
import { TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';

export default class Touchable extends React.Component {

    render() {
        const children = this.props.children;
        let button;
        if (Platform.OS === 'ios') {
            button = <TouchableHighlight onPress={() => { !this.props.disabled ? this.props.action() : false }} >
                {children}
            </TouchableHighlight>
        } else {
            button = <TouchableNativeFeedback onPress={() => { !this.props.disabled ? this.props.action() : false }} background={(!this.props.disabled) ? TouchableNativeFeedback.Ripple('rgba(255,255,255,.25)') : TouchableNativeFeedback.Ripple('transparent')} >
                {children}
            </TouchableNativeFeedback>
        }
        return (
            button
        );
    }
}