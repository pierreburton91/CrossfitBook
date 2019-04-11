import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import styles from '../../shared-styles/styles.js';
import FAB from '../../shared-components/fab.js';
import DetailsHeader from '../../shared-components/details-header.js';
import ButtonIcon from '../../shared-components/button-icon.js';
import AddRecordCommand from '../../commands/add-record-command.js';

export default class RecordDetailsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            record: this.props.navigation.getParam('record', {})
        }

        this._handleAddNewRecord = this._handleAddNewRecord.bind(this);
    }

    _handleCloseAction(navigation) {
        navigation.goBack();
    }

    _handleAddNewRecord() {
        const command = new AddRecordCommand();
        command.title = this.state.record.title;
        command.text = this.state.record.text;
        command.valuesTypesKey = this.state.record.valuesTypesKey;
        command.unit = this.state.record.value.split(' ')[1];
        this.props.navigation.navigate('AddRecord_newValues', {command: command});
    }
    
    render() {
        const record = this.state.record;
        const dataStub = [
            {
                title: 'Previous records', 
                data: [
                    {date: '02/01/2018', score: '120 kg'},
                    {date: '02/01/2018', score: '120 kg'},
                    {date: '02/01/2018', score: '120 kg'},
                    {date: '02/01/2018', score: '120 kg'},
                    {date: '02/01/2018', score: '120 kg'},
                    {date: '02/01/2018', score: '120 kg'},
                ]
        }]
        return (
        <View style={styles.container}>
            <DetailsHeader navigation={this.props.navigation} action={this._handleCloseAction} title={record.title} subTitle={record.text} isForm={false} />
            <View style={componentStyles.scoreContainer}>
                <Text style={[styles.textYellow, componentStyles.mainScore]}>{record.value}</Text>
                <ButtonIcon name='md-share' style={{marginRight: 8, marginTop: 4}} />
            </View>
            <Text style={[styles.textMuted, componentStyles.mainScoreDate]}>Performed on {record.date}</Text>
            <SectionList 
                contentContainerStyle={{paddingTop: 16, paddingBottom: 80}}
                sections={dataStub}
                renderItem={({item, index, section}) => 
                    <View key={index} style={componentStyles.previousScoreContainer}>
                        <Text style={[styles.textMuted, componentStyles.previousScoreText]}>{item.date}</Text>
                        <Text style={[styles.textYellow, componentStyles.previousScoreText]}>{item.score}</Text>
                    </View>
                }
                renderSectionHeader={({section: {title}}) => <Text style={[styles.textYellow, componentStyles.previousScoreHeader]}>{title}</Text>}
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