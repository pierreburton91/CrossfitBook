import React from 'react';
import { View, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../shared-styles/styles.js';
import FAB from '../../shared-components/fab.js';
import HeaderHero from '../../shared-components/header.js';
import RecordComponent from './components/record-component.js';

export default class RecordsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
        }
    }
    
    _handleRecordSelect(element, navigation) {
        navigation.navigate('Details', {record: element});
    }

    render() {
        const dataStub = [
            {title: 'Hello1', text: 'My first item', value: '110 Kg', date: '0/01/2018'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', date: '0/01/2018'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', date: '0/01/2018'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', date: '0/01/2018'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', date: '0/01/2018'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', date: '0/01/2018'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', date: '0/01/2018'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', date: '0/01/2018'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', date: '0/01/2018'},
            {title: 'Hello', text: 'My first item', value: '110 Kg', date: '0/01/2018'},
        ];
        
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 112],
            outputRange: [200, 88],
            extrapolate: 'clamp'
        });

        const headerBlur = this.state.scrollY.interpolate({
            inputRange: [0, 112],
            outputRange: [0 , 1],
            extrapolate: 'clamp'
        });
        
        const AnimatedHeaderHero = Animated.createAnimatedComponent(HeaderHero);
        const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

        return (
        <View style={styles.container}>
            <AnimatedFlatList
                contentContainerStyle={{paddingTop: 200}}
                data={dataStub}
                renderItem={({item, index}) =>
                    <RecordComponent _handleRecordSelect={this._handleRecordSelect} navigation={this.props.navigation} key={index} record={item} />
                }
                scrollEventThrottle={0}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                )}
                keyExtractor={(item, index) => item + index}
            />
            <AnimatedHeaderHero title={"Personal records"} banner={'records'} height={headerHeight} blur={headerBlur} />
            <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.16)']} style={styles.tabBarShadow}></LinearGradient>
            <FAB onPress={() => {console.log('FAB Pressed on Records!')}} />
        </View>
        );
    }
}