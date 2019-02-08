import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../shared-styles/styles.js';
import HeaderHero from '../../shared-components/header.js';

export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <HeaderHero title={"Settings"} imageUri={'https://via.placeholder.com/800x450'} />
                
                <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.16)']} style={styles.tabBarShadow}></LinearGradient>
            </View>
        );
    }
}