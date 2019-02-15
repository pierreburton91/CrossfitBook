import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';

export default class RecordComponent extends React.Component {
    render() {
        const swipeRightOptns = [
            {
                backgroundColor: '#e53935',
                underlayColor: '#ab000d',
                onPress: () => { console.log('Delete item') },
                component: <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} ><MaterialCommunityIcons size={28} name='trash-can-outline' color='#ffffff' /></View>
            }
        ];
        const swipeLeftOptns = [
            {
                backgroundColor: '#eeff41',
                underlayColor: '#b8cc00',
                onPress: () => { console.log('Edit item') },
                component: <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} ><MaterialCommunityIcons size={28} name='square-edit-outline' color='#000000' /></View>
            }
        ];

        let listElement;
        if (Platform.OS === 'ios') {
            listElement = <Swipeout key={this.props.index} scroll={(scrollEnabled) => { this.props._swipe(scrollEnabled)}} right={swipeRightOptns} left={swipeLeftOptns} sensitivity={25} autoClose={true} backgroundColor='transparent'>
                            <TouchableHighlight onPress={() => this.props._handleRecordSelect(this.props.record, this.props.navigation)} scroll> 
                                <View style={styles.recordContainer}>
                                    <View style={styles.recordDataContainer} >
                                        <View style={styles.recordTextContainer}>
                                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.recordTitle}>{this.props.record.title}</Text>
                                            <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.recordText}>{this.props.record.text}</Text>
                                        </View>
                                        <Text style={styles.recordValue}>{this.props.record.value}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </Swipeout>
        } else {
            listElement =  <Swipeout key={this.props.index} scroll={(scrollEnabled) => { this.props._swipe(scrollEnabled)}} right={swipeRightOptns} left={swipeLeftOptns} sensitivity={25} autoClose={true} backgroundColor='transparent'>
                            <TouchableNativeFeedback onPress={() => this.props._handleRecordSelect(this.props.record, this.props.navigation)} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,.25)')} >
                                <View style={styles.recordContainer}>
                                    <View style={styles.recordDataContainer} >
                                        <View style={styles.recordTextContainer}>
                                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.recordTitle}>{this.props.record.title}</Text>
                                            <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.recordText}>{this.props.record.text}</Text>
                                        </View>
                                        <Text style={styles.recordValue}>{this.props.record.value}</Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </Swipeout>
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
        flexDirection: 'row'
    },
    recordDataContainer: {
        justifyContent: 'space-between',
        flex: 1,
        padding: 16,
        flexDirection: 'row'
    },
    recordTextContainer: {
        flex: 1
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
    }
});