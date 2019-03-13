import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import styles from '../../shared-styles/styles.js';
import DetailsHeader from '../../shared-components/details-header.js';

export default class AddRecordDesc extends React.Component {
    constructor(props) {
        super(props);

        this._handleCancelAction = this._handleCancelAction.bind(this);
    }
    _handleCancelAction() {
        Alert.alert('Cancel new record', 'All your modifications will be lost.', [{text: 'Confirm', onPress: () => this._cancelAddNew()}, {text: 'Keep going', style: 'cancel'}], {cancelable: true});
    }

    _cancelAddNew() {
        this.props.navigation.navigate('Main');
    }

    render() {
        const recordType = this.props.navigation.getParam('command', {}).title;
        return (
            <View style={styles.container}>
                <DetailsHeader action={this._handleCancelAction} title={'New record'} subTitle={recordType} isForm={true} label={'CANCEL'} />
            </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    
});