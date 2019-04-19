import React from 'react';
import { View, Text, StyleSheet, Alert, TextInput, findNodeHandle, Keyboard, TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';
import styles from '../../shared-styles/styles.js';
import DetailsHeader from '../../shared-components/details-header.js';
import ButtonRaised from '../../shared-components/button-raised.js';
import colors from '../../shared-styles/colors.js';
import { RadioGroup } from 'react-native-btr';
import BenchmarkScoreTypesEnum from '../../static/benchmark-score-types-enum.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';

export default class AddBenchmarkValues extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            radioButtons: [{ label: 'Rx', value: false, checked: true }, { label: 'Scaled', value: true }],
            radioValue: false,
            resultValue: '',
            isScoreValid: false,
            scaleTextValue: '',
            time: '000000',
            timeDisplay: '00:00:00',
            date: new Date(),
            paddingKeyboard: 0,
            isUpdate: false
        };

        this._handleCancelAction = this._handleCancelAction.bind(this);
        this._handleValidateAction = this._handleValidateAction.bind(this);
        this._handleRadioPress = this._handleRadioPress.bind(this);
        this._scrollToInput = this._scrollToInput.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);

        const command = this.props.navigation.getParam('command', {});

        if (command.value != null) {
            this.isUpdate = true;
            this.state.radioButtons = command.isScaled ? [{ label: 'Rx', value: false }, { label: 'Scaled', value: true, checked: true }] : [{ label: 'Rx', value: false, checked: true }, { label: 'Scaled', value: true }];
            this.state.radioValue = command.isScaled;
            this.state.scaleTextValue = command.scaleText;
            this.state.date = command.date;
        }
    }

    componentDidMount() {
        if (this.state.radioButtons.find(e => e.checked == true)) {
            this._handleRadioPress(this.state.radioButtons);
        }

        if (this.state.isUpdate) {
            this.setState({ resultValue: this.props.navigation.getParam('command').value, isResultValid: true });
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

    _renderRecordInput() {
        const recordType = BenchmarkScoreTypesEnum(this.props.navigation.getParam('command').valuesTypesKey).label;
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
        this.props.navigation.navigate('BenchmarksMain');
    }

    _handleRadioPress(radioButtons) {
        this.setState({ radioButtons });
        this.setState({ radioValue: this.state.radioButtons.find(e => e.checked == true).value });
        this.setState({ scaleTextValue: '' });
        console.log(this.state.radioValue);
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
        this.setState({ scaleTextValue: text });
    }

    _handleValidateAction() {
        const command = this.props.navigation.getParam('command', {});
        command.text = this.state.descValue;
        command.value = this.state.resultValue;
        command.unit = this.state.radioValue.value;
        command.date = new Date(this.state.date);
        console.log(command);
        this.props.navigation.navigate('BenchmarksMain', { shouldRefresh: true });
    }

    render() {
        const recordType = this.props.navigation.getParam('command', {}).title;
        const showRemainingInputs = this.state.radioValue;
        const unit = this.props.navigation.getParam('command', {}).unit;
        return (
            <View style={[styles.container, { paddingBottom: this.state.paddingKeyboard }]}>
                <KeyboardAwareScrollView innerRef={ref => {
                    this.scroll = ref
                }}>
                    <DetailsHeader action={this._handleCancelAction} title={'New record'} subTitle={recordType} isForm={true} label={'CANCEL'} />
                    <View style={componentStyles.unitInputLabel}>
                        <Text style={[styles.textYellow, componentStyles.inputTitle]}>Your score</Text>
                        <Text style={[styles.textMuted, componentStyles.unit]}>{unit}</Text>
                    </View>
                    {this._renderRecordInput()}

                    <Text style={[styles.textYellow, componentStyles.inputTitle]}>Difficulty</Text>
                    <View style={{ flexShrink: 1 }}>
                        <RadioGroup labelStyle={styles.text} style={{ margin: 16 }} color={colors.accent} radioButtons={this.state.radioButtons} onPress={this._handleRadioPress} />
                    </View>
                    <View style={{ display: showRemainingInputs ? 'flex' : 'none' }}>
                        <View style={componentStyles.unitInputLabel}>
                            <Text style={[styles.textYellow, componentStyles.inputTitle]}>Scaling info</Text>
                            <Text style={[styles.textMuted, componentStyles.unit]}>(Optionnal)</Text>
                        </View>
                        <TextInput onFocus={(event) => {
                            this._scrollToInput(findNodeHandle(event.target))
                        }} returnKeyType='done' style={styles.textInput} value={this.state.scaleTextValue} underlineColorAndroid={colors.accent} clearButtonMode='while-editing' keyboardAppearance='dark' onChangeText={(text) => this._handleDescInput(text)} />
                    </View>
                    <Text style={[styles.textYellow, componentStyles.inputTitle]}>Achieving date</Text>
                    <DatePicker
                        date={this.state.date}
                        mode="date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{ dateTouch: { width: 'auto' }, dateTouchBody: { marginLeft: 16, justifyContent: 'flex-start', alignItems: 'flex-start', height: 'auto' }, dateIcon: { display: 'none' }, dateInput: { flex: 0, borderWidth: 0, height: 'auto', paddingTop: 16, paddingBottom: 16 }, dateText: { color: '#fff' } }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                    <ButtonRaised style={{ margin: 16 }} action={this._handleValidateAction} disabled={!this.state.isResultValid} label='VALIDATE' />
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
    }
});