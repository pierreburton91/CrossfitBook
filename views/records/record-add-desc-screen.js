import React from 'react';
import { View, Text, StyleSheet, Alert, TextInput, Platform, Button, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import styles from '../../shared-styles/styles.js';
import DetailsHeader from '../../shared-components/details-header.js';
import colors from '../../shared-styles/colors.js';

export default class AddRecordDesc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFieldValid: false,
            fieldValue: ''
        };

        this._handleCancelAction = this._handleCancelAction.bind(this);
    }

    _renderSuggestions() {
        const suggestions = ['1 RM', '3 RM', 'Max effort'];
        const views = [];
        suggestions.forEach((suggestion, index) => {
            let view;
            if (Platform.OS === 'ios') {
                view = <TouchableHighlight key={index} onPress={() => this._handleSuggestionSelect(suggestion)} >
                            <View style={componentStyles.suggestionContainer}>
                                <Text style={componentStyles.suggestionText}>{suggestion}</Text>
                            </View>
                            </TouchableHighlight>
            } else {
                view = <TouchableNativeFeedback key={index} onPress={() => this._handleSuggestionSelect(suggestion)} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,.25)')} > 
                            <View style={componentStyles.suggestionContainer}>
                                <Text style={componentStyles.suggestionText}>{suggestion}</Text>
                            </View>
                            </TouchableNativeFeedback>
            }
            views.push(view);
        })
        return views;
    }

    _handleCancelAction() {
        Alert.alert('Cancel new record', 'All your modifications will be lost.', [{text: 'Confirm', onPress: () => this._cancelAddNew()}, {text: 'Keep going', style: 'cancel'}], {cancelable: true});
    }

    _cancelAddNew() {
        this.props.navigation.navigate('Main');
    }

    _handleInput(text) {
        this._updateField(text);
    }

    _handleSuggestionSelect(suggestionText) {
        this._updateField(suggestionText);
    }

    _updateField(text) {
        this.setState({ isFieldValid: text.length > 0 ? true : false, fieldValue: text });
    }

    _handleValidateAction() {
        const command = this.props.navigation.getParam('command', {});
        command.text = this.state.fieldValue;
    }

    render() {
        const recordType = this.props.navigation.getParam('command', {}).title;
        return (
            <View style={styles.container}>
                <DetailsHeader action={this._handleCancelAction} title={'New record'} subTitle={recordType} isForm={true} label={'CANCEL'} />
                <Text style={[styles.textYellow, componentStyles.inputTitle]}>Describe your record</Text>
                <TextInput returnKeyType='done' style={styles.textInput} value={this.state.fieldValue} autoFocus={true} placeholder='Record description' underlineColorAndroid={colors.accent} clearButtonMode='while-editing' keyboardAppearance='dark' onChangeText={(text) => this._handleInput(text)} />
                <View style={componentStyles.suggestionsContainer}>
                    {this._renderSuggestions()}
                </View>
                <Button onPress={() => this._handleValidateAction()} disabled={!this.state.isFieldValid} color={colors.accent} title='NEXT' accessibilityLabel='Next step' />  
            </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    inputTitle: {
        // fontSize: 20,
        // fontWeight: '700',
        marginLeft: 16,
        marginTop: 32
    },

});