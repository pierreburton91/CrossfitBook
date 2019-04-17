import React from 'react';
import { View, Text, StyleSheet, SectionList, Platform, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import styles from '../../shared-styles/styles.js';
import DetailsHeader from '../../shared-components/details-header.js';
import MovesData from '../../static/moves-data.js';

export default class AddBenchmarkSelect extends React.Component {
    constructor(props) {
        super(props);

        this._handleCancelAction = this._handleCancelAction.bind(this);
    }
    
    _handleCancelAction() {
        this.props.navigation.goBack();
    }

    _renderListItem(item, index) {
        if (Platform.OS === 'ios') {
            return <TouchableHighlight onPress={() => this._handleTypeSelect(item)} background='transparent'>
                <View key={index} style={componentStyles.typeItem}>
                        <Text style={[styles.text, componentStyles.typeItemText]}>{item.name}</Text>
                    </View>
            </TouchableHighlight>
        } else {
            return <TouchableNativeFeedback onPress={() => this._handleTypeSelect(item)} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,.25)')}>
                <View key={index} style={componentStyles.typeItem}>
                        <Text style={[styles.text, componentStyles.typeItemText]}>{item.name}</Text>
                    </View>
            </TouchableNativeFeedback>
        }
    }

    _handleTypeSelect(item) {
        const command = this.props.navigation.getParam('command', {});
        command.title = item.name;
        command.valuesTypesKey = item.valuesTypesKey;
        this.props.navigation.navigate('AddRecord_newValues', {command: command});
    }

    render() {
        const dataStub = MovesData;

        return (
        <View style={styles.container}>
            <DetailsHeader action={this._handleCancelAction} title={'New record'} isForm={true} label={'CANCEL'} />
            <SectionList 
                contentContainerStyle={{paddingTop: 16}}
                sections={dataStub}
                renderItem={({item, index}) => 
                    this._renderListItem(item, index)
                }
                renderSectionHeader={({section: {title}}) => <Text style={[styles.textYellow, componentStyles.typeSectionHeader]}>{title}</Text>}
                keyExtractor={(item, index) => item + index}
            />
        </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    typeSectionHeader: {
        marginLeft: 16,
        marginBottom: 8,
        marginTop: 16,
        fontWeight: '700'
    },
    typeItem: {
        padding: 16,
    },
    typeItemText: {
        fontSize: 16
    }
});