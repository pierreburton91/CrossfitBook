import React from 'react';
import { View, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../shared-styles/styles.js';
import HeaderHero from '../../shared-components/header.js';
import BenchmarkComponent from './components/benchmark-component.js';

export default class BenchmarksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        scrollY: new Animated.Value(0),
    }
  }

  render() {
    const dataStub = [
      {title: 'Hello1', text: 'My first item', value: '110 Kg', key: '0'},
      {title: 'Hello', text: 'My first item', value: '110 Kg', key: '1'},
      {title: 'Hello', text: 'My first item', value: '110 Kg', key: '2'},
      {title: 'Hello', text: 'My first item', value: '110 Kg', key: '3'},
      {title: 'Hello', text: 'My first item', value: '110 Kg', key: '4'},
      {title: 'Hello', text: 'My first item', value: '110 Kg', key: '5'},
      {title: 'Hello', text: 'My first item', value: '110 Kg', key: '6'},
      {title: 'Hello', text: 'My first item', value: '110 Kg', key: '7'},
      {title: 'Hello', text: 'My first item', value: '110 Kg', key: '8'},
      {title: 'Hello', text: 'My first item', value: '110 Kg', key: '9'},
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
          renderItem={({item}) =>
            <BenchmarkComponent record={item} />
          }
          scrollEventThrottle={0}
          onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
        />
        <AnimatedHeaderHero title={"Benchmarks"} banner={'benchmarks'} height={headerHeight} blur={headerBlur} />
        <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.16)']} style={styles.tabBarShadow}></LinearGradient>
      </View>
    );
  }
}