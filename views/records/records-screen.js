import React from 'react';
import { View, Text } from 'react-native';
import FAB from '../../shared-components/fab.js';
import HeaderHero from '../../shared-components/header.js';

export default class RecordsScreen extends React.Component {
    render() {
        return (
        <View style={styles.container}>
            <HeaderHero title={"Personal records"} imageUri={'https://via.placeholder.com/800x450'} />
            <FAB onPress={() => {console.log('FAB Pressed on Records!')}} />
            <Text style={{color: '#ffffff'}}>Hello World!</Text>
        </View>
        );
    }
}