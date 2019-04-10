import React from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, TextInput, findNodeHandle, Keyboard } from 'react-native';
import styles from '../../shared-styles/styles.js';
import DetailsHeader from '../../shared-components/details-header.js';
import ButtonRaised from '../../shared-components/button-raised.js';
import colors from '../../shared-styles/colors.js';
import { RadioGroup } from 'react-native-btr';
import MovesValuesTypesEnum from '../../static/moves-values-types-enum.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class AddRecordValues extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            radioButtons: MovesValuesTypesEnum(this.props.navigation.getParam('command').valuesTypesKey),
            isFieldValid: false,
            radioValue: null,
            fieldValue: '',
            time: '000000',
            timeDisplay: '00:00:00',
            paddingKeyboard: 0
        };

        this._handleCancelAction = this._handleCancelAction.bind(this);
        this._handleValidateAction = this._handleValidateAction.bind(this);
        this._handleRadioPress = this._handleRadioPress.bind(this);
        this._scrollToInput = this._scrollToInput.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow(e) {
        const keyboardHeight = e.endCoordinates.height;
        this.setState({paddingKeyboard: keyboardHeight});
        // this._scrollView.scrollTo({y: keyboardHeight + 76, animated: true});
    }

    _keyboardDidHide() {
        this.setState({paddingKeyboard: 0});
    }

    _scrollToInput (reactNode) {
        this.scroll.props.scrollToFocusedInput(reactNode)
      }

    _handleCancelAction() {
        Alert.alert('Cancel new record', 'All your modifications will be lost.', [{ text: 'Confirm', onPress: () => this._cancelAddNew() }, { text: 'My bad!', style: 'cancel' }], { cancelable: true });
    }

    _cancelAddNew() {
        this.props.navigation.navigate('Main');
    }

    _handleRadioPress(radioButtons) {
        this.setState({ radioButtons });
        this.setState({ radioValue: this.state.radioButtons.find(e => e.checked == true) });
    }

    _handleInput(text) {
        if (text.length > 9 || text.length < 8) {
            return;
        }
        if (text.match(/[A-z]|[!@#$%^&*(),.?"{}|<>-\s]/)) {
            return;
        }
        
        let newTime = this.state.time.slice(1) + text.slice(8);
        newTimeDisplay = newTime.substring(0, 2) + ':' + newTime.substring(2, 4) + ':' + newTime.substring(4);
        this.setState({ time: newTime, timeDisplay: newTimeDisplay });
        this._updateField(newTimeDisplay);
    }

    _updateField(text) {
        this.setState({ isFieldValid: text.length > 0 ? true : false, fieldValue: text });
    }

    _handleValidateAction() {

    }

    render() {
        const recordType = `${this.props.navigation.getParam('command', {}).title} - ${this.props.navigation.getParam('command', {}).text}`;
        const showRemainingInputs = this.state.radioValue != null ? true : false;
        return (
            <View style={[styles.container, {paddingBottom: this.state.paddingKeyboard}]}>
                <KeyboardAwareScrollView innerRef={ref => {
    this.scroll = ref
  }}>
                    <DetailsHeader action={this._handleCancelAction} title={'New record'} subTitle={recordType} isForm={true} label={'CANCEL'} />
                    <Text style={[styles.textYellow, componentStyles.inputTitle]}>Record type</Text>
                    <View style={{ flexShrink: 1 }}>
                        <RadioGroup labelStyle={styles.text} style={{ margin: 16 }} color={colors.accent} radioButtons={this.state.radioButtons} onPress={this._handleRadioPress} />
                    </View>
                    <View style={{ display: showRemainingInputs ? 'flex' : 'none' }}>
                        <Text style={[styles.textYellow, componentStyles.inputTitle]}>Your score</Text>
                        <TextInput onFocus={(event) => {
        // `bind` the function if you're using ES6 classes
        this._scrollToInput(findNodeHandle(event.target))
      }} keyboardType='number-pad' returnKeyType='done' maxLength={9} style={styles.textInput} value={this.state.timeDisplay} placeholder='00:00:00' underlineColorAndroid={colors.accent} clearButtonMode='while-editing' keyboardAppearance='dark' onChangeText={(e) => this._handleInput(e)} />
                        <ButtonRaised style={{ margin: 16 }} action={this._handleValidateAction} disabled={!this.state.isFieldValid} label='VALIDATE' />
                    </View>
                    <View style={{ display: showRemainingInputs ? 'flex' : 'none' }}>
                        <Text style={[styles.textYellow, componentStyles.inputTitle]}>1</Text>
                        <TextInput onFocus={(event) => {
        // `bind` the function if you're using ES6 classes
        this._scrollToInput(findNodeHandle(event.target))
      }} keyboardType='number-pad' returnKeyType='done' maxLength={9} style={styles.textInput} value={this.state.timeDisplay} placeholder='00:00:00' underlineColorAndroid={colors.accent} clearButtonMode='while-editing' keyboardAppearance='dark' onChangeText={(e) => this._handleInput(e)} />
                        <ButtonRaised style={{ margin: 16 }} action={this._handleValidateAction} disabled={!this.state.isFieldValid} label='VALIDATE' />
                    </View>
                    <View style={{ display: showRemainingInputs ? 'flex' : 'none' }}>
                        <Text style={[styles.textYellow, componentStyles.inputTitle]}>Y2</Text>
                        <TextInput onFocus={(event) => {
        // `bind` the function if you're using ES6 classes
        this._scrollToInput(findNodeHandle(event.target))
      }} keyboardType='number-pad' returnKeyType='done' maxLength={9} style={styles.textInput} value={this.state.timeDisplay} placeholder='00:00:00' underlineColorAndroid={colors.accent} clearButtonMode='while-editing' keyboardAppearance='dark' onChangeText={(e) => this._handleInput(e)} />
                        <ButtonRaised style={{ margin: 16 }} action={this._handleValidateAction} disabled={!this.state.isFieldValid} label='VALIDATE' />
                    </View>
                    <View style={{ display: showRemainingInputs ? 'flex' : 'none' }}>
                        <Text style={[styles.textYellow, componentStyles.inputTitle]}>3</Text>
                        <TextInput onFocus={(event) => {
        // `bind` the function if you're using ES6 classes
        this._scrollToInput(findNodeHandle(event.target))
      }} keyboardType='number-pad' returnKeyType='done' maxLength={9} style={styles.textInput} value={this.state.timeDisplay} placeholder='00:00:00' underlineColorAndroid={colors.accent} clearButtonMode='while-editing' keyboardAppearance='dark' onChangeText={(e) => this._handleInput(e)} />
                        <ButtonRaised style={{ margin: 16 }} action={this._handleValidateAction} disabled={!this.state.isFieldValid} label='VALIDATE' />
                    </View>
                    <View style={{ display: showRemainingInputs ? 'flex' : 'none' }}>
                        <Text style={[styles.textYellow, componentStyles.inputTitle]}>4</Text>
                        <TextInput onFocus={(event) => {
        // `bind` the function if you're using ES6 classes
        this._scrollToInput(findNodeHandle(event.target))
      }} keyboardType='number-pad' returnKeyType='done' maxLength={9} style={styles.textInput} value={this.state.timeDisplay} placeholder='00:00:00' underlineColorAndroid={colors.accent} clearButtonMode='while-editing' keyboardAppearance='dark' onChangeText={(e) => this._handleInput(e)} />
                        <ButtonRaised style={{ margin: 16 }} action={this._handleValidateAction} disabled={!this.state.isFieldValid} label='VALIDATE' />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    inputTitle: {
        fontWeight: '500',
        marginLeft: 16,
        marginTop: 32
    }
});