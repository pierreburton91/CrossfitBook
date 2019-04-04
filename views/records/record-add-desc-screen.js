import React from 'react';
import { View, Text, StyleSheet, Alert, TextInput, Platform, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import styles from '../../shared-styles/styles.js';
import DetailsHeader from '../../shared-components/details-header.js';
import ButtonRaised from '../../shared-components/button-raised.js';
import colors from '../../shared-styles/colors.js';

export default class AddRecordDesc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFieldValid: false,
            fieldValue: ''
        };

        this._handleCancelAction = this._handleCancelAction.bind(this);
        this._handleValidateAction = this._handleValidateAction.bind(this);
    }

    _renderSuggestions() {
        const suggestions = ['1 RM', '3 RM', 'Max effort'];
        const views = [];
        suggestions.forEach((suggestion, index) => {
            let view;
            if (Platform.OS === 'ios') {
                view = <TouchableHighlight key={index} onPress={() => this._handleSuggestionSelect(suggestion)} >
                            <View style={componentStyles.suggestionBox}>
                                <Text style={componentStyles.suggestionText}>{suggestion}</Text>
                            </View>
                            </TouchableHighlight>
            } else {
                view = <TouchableNativeFeedback key={index} onPress={() => this._handleSuggestionSelect(suggestion)} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,.25)')} > 
                            <View style={componentStyles.suggestionBox}>
                                <Text style={componentStyles.suggestionText}>{suggestion}</Text>
                            </View>
                            </TouchableNativeFeedback>
            }
            views.push(view);
        })
        return views;
    }

    _handleCancelAction() {
        Alert.alert('Cancel new record', 'All your modifications will be lost.', [{text: 'Confirm', onPress: () => this._cancelAddNew()}, {text: 'My bad!', style: 'cancel'}], {cancelable: true});
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

        this.props.navigation.navigate('AddRecord_newValues', {command: command});
    }

    render() {
        const recordType = this.props.navigation.getParam('command', {}).title;
        return (
            <View style={styles.container}>
                <DetailsHeader action={this._handleCancelAction} title={'New record'} subTitle={recordType} isForm={true} label={'CANCEL'} />
                <Text style={[styles.textYellow, componentStyles.inputTitle]}>Describe your record</Text>
                <TextInput returnKeyType='done' style={styles.textInput} value={this.state.fieldValue} autoFocus={true} placeholder='Record description' underlineColorAndroid={colors.accent} clearButtonMode='while-editing' keyboardAppearance='dark' onChangeText={(text) => this._handleInput(text)} />
                <Text style={[styles.textMuted, componentStyles.label]}>Suggestions:</Text>
                <View style={componentStyles.suggestionsContainer}>
                    {this._renderSuggestions()}
                </View>
                <ButtonRaised style={{margin: 16}} action={this._handleValidateAction} disabled={!this.state.isFieldValid} label='NEXT' />  
            </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    inputTitle: {
        // fontSize: 20,
        fontWeight: '500',
        marginLeft: 16,
        marginTop: 32
    },
    label: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8
    },
    suggestionsContainer: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        flexDirection: 'row'
    },
    suggestionBox: {
        borderRadius: 50,
        backgroundColor: '#6709B3',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        marginRight: 8,
        flexShrink: 1
    },
    suggestionText: {
        color: '#ffffff'
    }
});