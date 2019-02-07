import React from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo';
import FAB from 'react-native-fab'
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.header} source={{ uri: 'https://via.placeholder.com/800x450' }}>
          <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.25)']} style={styles.headerBackground}></LinearGradient>
          <Text style={[styles.text, styles.textHeader]}>Personal records</Text>
        </ImageBackground>
        <View style={{flex: 1}}>
          <Image source={require('./assets/icons/benchmark.svg')} style={{width: 60, height: 60}} />
        </View>
        <FAB buttonColor="#EEFF41" iconTextColor="#212121" onClickAction={() => {console.log("FAB pressed")}} visible={true} iconTextComponent={<Ionicons name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}/>} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121'
  },
  text : {
    color: '#ffffff'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    aspectRatio: 1.7,
    alignItems: 'flex-end',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  textHeader: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 12
  }
});
