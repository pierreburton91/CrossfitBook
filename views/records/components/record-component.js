import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';

export default class RecordComponent extends React.Component {
    render() {
        let listElement;
        if (Platform.OS === 'ios') {
            listElement = <TouchableHighlight onPress={() => this.props._handleRecordSelect(this.props.record.key, this.props.navigation)} > 
                        <View key={this.props.record.key} style={styles.recordContainer}>
                            <View>
                                <Text style={styles.recordTitle}>{this.props.record.title}</Text>
                                <Text style={styles.recordText}>{this.props.record.text}</Text>
                            </View>
                            <Text style={styles.recordValue}>{this.props.record.value}</Text>
                        </View>
                        </TouchableHighlight>
        } else {
            listElement = <TouchableNativeFeedback onPress={() => this.props._handleRecordSelect(this.props.record.key, this.props.navigation)} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,.25)')} > 
                        <View key={this.props.record.key} style={styles.recordContainer}>
                            <View>
                                <Text style={styles.recordTitle}>{this.props.record.title}</Text>
                                <Text style={styles.recordText}>{this.props.record.text}</Text>
                            </View>
                            <Text style={styles.recordValue}>{this.props.record.value}</Text>
                        </View>
                        </TouchableNativeFeedback>
        }
        return (
            listElement
        );
    }
}

const styles = StyleSheet.create({
    recordContainer: {
        justifyContent: 'space-between',
        width: '100%',
        padding: 16,
        flexDirection: 'row'
    },
    recordTitle: {
        fontWeight: '500',
        color: '#ffffff'
    },
    recordText: {
        fontWeight: '400',
        color: '#ffffff',
        opacity: .5
    },
    recordValue: {
        fontWeight: 'bold',
        color: '#EEFF41',
        fontSize: 24,
        alignSelf: 'center'
    },
});