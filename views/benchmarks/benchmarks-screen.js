import React from 'react';
import { View } from 'react-native';
import FAB from '../../shared-components/fab.js';
import HeaderHero from '../../shared-components/header.js';

export default class BenchmarksScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <HeaderHero title={"Benchmarks"} imageUri={'https://via.placeholder.com/800x450'} />
          <FAB onPress={() => {console.log('FAB Pressed on Benchmarks!')}} />
        </View>
      );
    }
  }