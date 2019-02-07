import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, BottomTabBar } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import RecordsScreen from './views/records/records-screen.js';
import BenchmarksScreen from './views/benchmarks/benchmarks-screen.js';
import SettingsScreen from './views/settings/settings-screen.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121'
  },
  text : {
    color: '#ffffff'
  },
  tabBar: {
    backgroundColor: '#212121',
    borderTopColor: '#212121',
    borderWidth: 0
  },
  tabBarShadow: {
    height: 8,
    width: '100%',
    backgroundColor: '#212121'
  }
});

const TabBarComponent = (props) => (
    <View>
      <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.12)']} style={styles.tabBarShadow}></LinearGradient>
      <BottomTabBar {...props} />
    </View>
  );

const TabNavigator = createBottomTabNavigator({
  Records: RecordsScreen,
  Benchmarks: BenchmarksScreen,
  Settings: SettingsScreen,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Records') {
        iconName = `trophy-award`;
      } else if (routeName === 'Benchmarks') {
        iconName = `pulse`;
      } else {
        iconName = `tune`;
      }

      // You can return any component that you like here!
      return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#EEFF41',
    inactiveTintColor: 'rgba(255,255,255,.54)',
    style: styles.tabBar
  },
  tabBarComponent: props =>
      <TabBarComponent {...props} />
});

export default createAppContainer(TabNavigator);