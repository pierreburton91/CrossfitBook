import React from 'react';
import { View } from 'react-native';
import HeaderHero from '../../shared-components/header.js';

export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <HeaderHero title={"Settings"} imageUri={'https://via.placeholder.com/800x450'} />
            </View>
        );
    }
}