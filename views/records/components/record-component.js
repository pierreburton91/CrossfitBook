import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class RecordComponent extends React.Component {
    render() {
        return (
        <View style={styles.recordContainer}>
            <View>
                <Text style={styles.recordTitle}>{this.props.record.title}</Text>
                <Text style={styles.recordText}>{this.props.record.text}</Text>
            </View>
            <Text style={styles.recordValue}>{this.props.record.value}</Text>
        </View>
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