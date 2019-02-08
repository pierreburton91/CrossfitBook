import React from 'react';
import { View, FlatList } from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../shared-styles/styles.js';
import FAB from '../../shared-components/fab.js';
import HeaderHero from '../../shared-components/header.js';
import RecordComponent from './components/record-component.js';

export default class RecordsScreen extends React.Component {
    render() {
        const dataStub = [
            {title: 'Hello', text: 'My first item', value: '110 Kg', key: '0'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', key: '1'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', key: '2'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', key: '3'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', key: '4'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', key: '5'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', key: '6'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', key: '7'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', key: '8'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', key: '91'},
        ]
        return (
        <View style={styles.container}>
            <HeaderHero title={"Personal records"} imageUri={'https://via.placeholder.com/800x450'} />
            <FlatList data={dataStub} renderItem={({item}) => <RecordComponent record={item} />} />

            <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.16)']} style={styles.tabBarShadow}></LinearGradient>
            <FAB onPress={() => {console.log('FAB Pressed on Records!')}} />
        </View>
        );
    }
}