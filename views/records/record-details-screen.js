import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import styles from '../../shared-styles/styles.js';
import FAB from '../../shared-components/fab.js';
import DetailsHeader from '../../shared-components/details-header.js';
import ButtonIcon from '../../shared-components/button-icon.js';
import AddRecordCommand from '../../commands/add-record-command.js';
import Swipeout from 'react-native-swipeout';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class RecordDetailsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            record: this.props.navigation.getParam('record', {}),
            data: [
                { title: 'Hello1', text: 'My first item', valuesTypesKey: 0, date: '02-01-2018', value: '120 Kg' },
                { title: 'Hello1', text: 'My first item', valuesTypesKey: 0, date: '02-01-2018', value: '120 Kg' },
                { title: 'Hello1', text: 'My first item', valuesTypesKey: 0, date: '02-01-2018', value: '120 Kg' },
                { title: 'Hello1', text: 'My first item', valuesTypesKey: 0, date: '02-01-2018', value: '120 Kg' },
                { title: 'Hello1', text: 'My first item', valuesTypesKey: 0, date: '02-01-2018', value: '120 Kg' },
                { title: 'Hello1', text: 'My first item', valuesTypesKey: 0, date: '02-01-2018', value: '120 Kg' }
            ]
        }

        this._handleCloseAction = this._handleCloseAction.bind(this);
        this._handleAddNewRecord = this._handleAddNewRecord.bind(this);
        this._handleDeleteRecord = this._handleDeleteRecord.bind(this);
        this._handleUpdateRecord = this._handleUpdateRecord.bind(this);
    }

    _handleCloseAction() {
        this.props.navigation.goBack();
    }

    _handleAddNewRecord() {
        const command = new AddRecordCommand();
        command.title = this.state.record.title;
        command.text = this.state.record.text;
        command.valuesTypesKey = this.state.record.valuesTypesKey;
        command.unit = this.state.record.value.split(' ')[1];
        this.props.navigation.navigate('AddRecord_newValues', { command: command });
    }

    _handleUpdateRecord(item) {
        const command = new AddRecordCommand();
        command.title = item.title;
        command.text = item.text;
        command.valuesTypesKey = item.valuesTypesKey;
        command.unit = item.value.split(' ')[1];
        command.value = item.value.split(' ')[0];
        command.date = item.date;
        this.props.navigation.navigate('AddRecord_newValues', { command: command });
    }

    _handleDeleteRecord(item) {
        Alert.alert('Delete previous score', 'Are you sure you want to delete this score ?', [{ text: 'Confirm', onPress: () => this._deleteRecord(item) }, { text: 'My bad!', style: 'cancel' }], { cancelable: true });
    }

    _deleteRecord(item) {
        const index = this.state.data.indexOf(item);
        const tempArray = JSON.parse(JSON.stringify(this.state.data))
        tempArray.splice(index, 1);
        this.setState({ data: tempArray });
    }

    _renderPreviousRecords(item, index) {
        const swipeRightOptns = [
            {
                backgroundColor: '#e53935',
                underlayColor: '#ab000d',
                onPress: () => { this._handleDeleteRecord(item) },
                component: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} ><MaterialCommunityIcons size={28} name='trash-can-outline' color='#ffffff' /></View>
            }
        ];
        const swipeLeftOptns = [
            {
                backgroundColor: '#eeff41',
                underlayColor: '#b8cc00',
                onPress: () => { this._handleUpdateRecord(item) },
                component: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} ><MaterialCommunityIcons size={28} name='square-edit-outline' color='#000000' /></View>
            }
        ];

        return (
            <Swipeout key={this.props.index} right={swipeRightOptns} left={swipeLeftOptns} sensitivity={12} autoClose={true} backgroundColor='transparent'>
                <View key={index} style={componentStyles.previousScoreContainer}>
                    <Text style={[styles.textMuted, componentStyles.previousScoreText]}>{item.date}</Text>
                    <Text style={[styles.textYellow, componentStyles.previousScoreText]}>{item.value}</Text>
                </View>
            </Swipeout>
        );
    }

    render() {
        const record = this.state.record;

        return (
            <View style={styles.container}>
                <DetailsHeader action={this._handleCloseAction} title={record.title} subTitle={record.text} isForm={false} />
                <View style={componentStyles.scoreContainer}>
                    <Text style={[styles.textYellow, componentStyles.mainScore]}>{record.value}</Text>
                    <ButtonIcon name='md-more' style={{ marginRight: 8, marginTop: 4 }} />
                </View>
                <Text style={[styles.textMuted, componentStyles.mainScoreDate]}>Performed on {record.date}</Text>
                <Text style={[styles.textYellow, componentStyles.previousScoreHeader]}>Previous scores</Text>
                <FlatList
                    contentContainerStyle={{paddingBottom: 80 }}
                    data={this.state.data}
                    renderItem={({ item, index }) =>
                        this._renderPreviousRecords(item, index)
                    }
                    keyExtractor={(item, index) => item + index}
                />
                <FAB onPress={() => this._handleAddNewRecord(record)} />
            </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    scoreContainer: {
        flexDirection: 'row',
        marginTop: 28,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16
    },
    mainScore: {
        fontWeight: '500',
        fontSize: 48
    },
    mainScoreDate: {
        marginLeft: 16,
        fontSize: 16,
        marginBottom: 24
    },
    previousScoreHeader: {
        marginLeft: 16,
        marginBottom: 16,
        fontWeight: '700'
    },
    previousScoreContainer: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between'
    },
    previousScoreText: {
        fontSize: 16
    }
});