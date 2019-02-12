import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../shared-styles/styles.js';
import FAB from '../../shared-components/fab.js';

export default class RecordDetailsScreen extends React.Component {
    render() {
        const key = this.props.navigation.getParam('key', 'None');

        return (
        <View style={styles.container}>
            <Text style={{color: '#fff'}}>{key} </Text>

            <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.16)']} style={styles.tabBarShadow}></LinearGradient>
            <FAB onPress={() => {console.log('FAB Pressed on Record details!')}} />
        </View>
        );
    }
}