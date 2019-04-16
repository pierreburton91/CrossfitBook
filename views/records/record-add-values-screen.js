import React from 'react';
import { View, Text, StyleSheet, Alert, TextInput, findNodeHandle, Keyboard, TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';
import styles from '../../shared-styles/styles.js';
import DetailsHeader from '../../shared-components/details-header.js';
import ButtonRaised from '../../shared-components/button-raised.js';
import colors from '../../shared-styles/colors.js';
import { RadioGroup } from 'react-native-btr';
import MovesValuesTypesEnum from '../../static/moves-values-types-enum.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';

export default class AddRecordValues extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            radioButtons: MovesValuesTypesEnum(this.props.navigation.getParam('command').valuesTypesKey),
            radioValue: null,
            descValue: '',
            isDescValid: false,
            resultValue: '',
            isResultValid: false,
            time: '000000',
            timeDisplay: '00:00:00',
            date: new Date(),
            paddingKeyboard: 0,
            isUpdate: false,
            isDeepUpdate: false
        };

        this._handleCancelAction = this._handleCancelAction.bind(this);
        this._handleValidateAction = this._handleValidateAction.bind(this);
        this._handleRadioPress = this._handleRadioPress.bind(this);
        this._scrollToInput = this._scrollToInput.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);

        const command = this.props.navigation.getParam('command', {});
        
        if (command.unit != null) {
            const radioButtonsTemp = JSON.parse(JSON.stringify(this.state.radioButtons));
            const radioToSelect = this.state.radioButtons.indexOf(this.state.radioButtons.find(e => e.value == command.unit));
            radioButtonsTemp[radioToSelect].checked = true;
            this.state.radioButtons = [radioButtonsTemp[radioToSelect]];
            this.state.isUpdate = true;
            this.state.descValue = command.text;
            this.state.isDescValid = true;
        }

        if (command.value != null) {
            this.state.isDeepUpdate = true;
            this.state.date = command.date;
        }
    }

    componentDidMount() {
        if (this.state.radioButtons.find(e => e.checked == true)) {
            this._handleRadioPress(this.state.radioButtons);
        }
        
        if (this.state.isDeepUpdate) {
            this.setState({resultValue: this.props.navigation.getParam('command').value, isResultValid: true });
        }
        
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
        this.setState({ paddingKeyboard: keyboardHeight });
    }

    _keyboardDidHide() {
        this.setState({ paddingKeyboard: 0 });
    }

    _scrollToInput(reactNode) {
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    _renderSuggestions() {
        if (this.state.isUpdate) {
            return;
        }

        let suggestions;
        switch (this.props.navigation.getParam('command', {}).valuesTypesKey) {
            case 0:
                suggestions = ['1 RM', '3 RM', 'Max effort'];
                break;
            case 1:
                suggestions = ['Max distance', 'Max cals', '1 Km'];
                break;
            case 2:
                suggestions = ['Max effort', '50 reps', '100 reps'];
                break;
            case 3:
                suggestions = ['Max effort', '50 m', '100 m'];
                break;
            case 4:
                suggestions = ['Max height', 'Max effort', '50 reps', '100 reps'];
                break;
        }
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

    _renderRecordInput() {
        const recordType = this.state.radioValue != null ? this.state.radioValue.label : '';
        let input;
        if (recordType == "Time") {
            input = <TextInput onFocus={(event) => {
                this._scrollToInput(findNodeHandle(event.target))
            }} keyboardType='number-pad' returnKeyType='done' maxLength={9} style={styles.textInput} value={this.state.timeDisplay} placeholder='00:00:00' underlineColorAndroid={colors.accent} clearButtonMode='while-editing' keyboardAppearance='dark' onChangeText={(e) => this._handleTimeInput(e)} />
        }
        else {
            input = <TextInput onFocus={(event) => {
                this._scrollToInput(findNodeHandle(event.target))
            }} keyboardType='number-pad' returnKeyType='done' style={styles.textInput} value={this.state.resultValue} placeholder='0' underlineColorAndroid={colors.accent} clearButtonMode='while-editing' keyboardAppearance='dark' onChangeText={(e) => this._handleResultInput(e)} />
        }
        return input;
    }

    _handleCancelAction() {
        Alert.alert('Cancel new record', 'All your modifications will be lost.', [{ text: 'Confirm', onPress: () => this._cancelAddNew() }, { text: 'My bad!', style: 'cancel' }], { cancelable: true });
    }

    _cancelAddNew() {
        this.props.navigation.navigate('Main');
    }

    _handleSuggestionSelect(suggestionText) {
        this._updateDesc(suggestionText);
    }

    _handleRadioPress(radioButtons) {
        this.setState({ radioButtons });
        this.setState({ radioValue: this.state.radioButtons.find(e => e.checked == true), time: '000000', timeDisplay: '00:00:00' });
        this._updateResult('');
    }

    _handleTimeInput(text) {
        if (text.length > 9 || text.length < 8) {
            return;
        }
        if (text.match(/[A-z]|[!@#$%^&*(),.?"{}|<>-\s]/)) {
            return;
        }

        let newTime = this.state.time.slice(1) + text.slice(8);
        newTimeDisplay = newTime.substring(0, 2) + ':' + newTime.substring(2, 4) + ':' + newTime.substring(4);
        this.setState({ time: newTime, timeDisplay: newTimeDisplay });
        this._updateResult(newTimeDisplay);
    }

    _handleResultInput(text) {
        if (text.match(/[A-z]|[!@#$%^&*(),?"{}|<>-\s]/)) {
            return;
        }
        this._updateResult(text);
    }

    _handleDescInput(text) {
        this._updateDesc(text);
    }

    _updateResult(text) {
        this.setState({ isResultValid: text.length > 0 ? true : false, resultValue: text });
    }
    _updateDesc(text) {
        this.setState({ isDescValid: text.length > 0 ? true : false, descValue: text });
    }

    _handleValidateAction() {
        const command = this.props.navigation.getParam('command', {});
        command.text = this.state.descValue;
        command.value = this.state.resultValue;
        command.unit = this.state.radioValue.value;
        command.date = new Date(this.state.date);
        console.log(command);
        this.props.navigation.navigate('Main');
    }

    render() {
        const recordType = this.props.navigation.getParam('command', {}).title;
        const showRemainingInputs = this.state.radioValue != null ? true : false;
        const unit = this.state.radioValue != null ? this.state.radioValue.value : '';
        return (
            <View style={[styles.container, { paddingBottom: this.state.paddingKeyboard }]}>
                <KeyboardAwareScrollView innerRef={ref => {
                    this.scroll = ref
                }}>
                    <DetailsHeader action={this._handleCancelAction} title={'New record'} subTitle={recordType} isForm={true} label={'CANCEL'} />
                    <Text style={[styles.textYellow, componentStyles.inputTitle]}>Describe your record</Text>
                    <TextInput onFocus={(event) => {
                        this._scrollToInput(findNodeHandle(event.target))
                    }} editable={!this.state.isUpdate} returnKeyType='done' style={styles.textInput} value={this.state.descValue} underlineColorAndroid={colors.accent} clearButtonMode='while-editing' keyboardAppearance='dark' onChangeText={(text) => this._handleDescInput(text)} />
                    <View style={this.state.isUpdate ? {display: 'none'} : componentStyles.suggestionsContainer}>
                        {this._renderSuggestions()}
                    </View>
                    <Text style={[styles.textYellow, componentStyles.inputTitle]}>Record type</Text>
                    <View style={{ flexShrink: 1 }}>
                        <RadioGroup labelStyle={styles.text} style={{ margin: 16 }} color={colors.accent} radioButtons={this.state.radioButtons} onPress={this._handleRadioPress} />
                    </View>
                    <View style={{ display: showRemainingInputs ? 'flex' : 'none' }}>
                        <View style={componentStyles.unitInputLabel}>
                            <Text style={[styles.textYellow, componentStyles.inputTitle]}>Your score</Text>
                            <Text style={[styles.textMuted, componentStyles.unit]}>{unit}</Text>
                        </View>
                        {this._renderRecordInput()}
                        <Text style={[styles.textYellow, componentStyles.inputTitle]}>Achieving date</Text>
                        <DatePicker
                            date={this.state.date}
                            mode="date"
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{dateTouch: { width: 'auto' }, dateTouchBody: { marginLeft: 16, justifyContent: 'flex-start', alignItems: 'flex-start', height: 'auto'}, dateIcon: { display: 'none'}, dateInput: { flex: 0, borderWidth: 0, height: 'auto', paddingTop: 16, paddingBottom: 16}, dateText: { color: '#fff' }}}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                        <ButtonRaised style={{ margin: 16 }} action={this._handleValidateAction} disabled={(!this.state.isDescValid || !this.state.isResultValid)} label='VALIDATE' />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    unitInputLabel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputTitle: {
        fontWeight: '500',
        marginLeft: 16,
        marginTop: 32
    },
    unit: {
        marginRight: 16,
        marginTop: 32
    },
    suggestionsContainer: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        flexDirection: 'row'
    },
    suggestionBox: {
        borderRadius: 50,
        backgroundColor: colors.muted,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        marginRight: 8,
        flexShrink: 1
    },
    suggestionText: {
        fontSize: 12
    }
});