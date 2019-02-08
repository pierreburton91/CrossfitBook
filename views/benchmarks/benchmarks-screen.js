import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../shared-styles/styles.js';
import FAB from '../../shared-components/fab.js';
import HeaderHero from '../../shared-components/header.js';

export default class BenchmarksScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <HeaderHero title={"Benchmarks"} imageUri={'https://via.placeholder.com/800x450'} />

          <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.16)']} style={styles.tabBarShadow}></LinearGradient>
          <FAB onPress={() => {console.log('FAB Pressed on Benchmarks!')}} />
        </View>
      );
    }
  }