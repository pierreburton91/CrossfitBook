import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RecordDetailsScreen from './views/records/record-details-screen.js';
import AddRecordType from './views/records/record-add-type-screen.js';
import AddRecordValues from './views/records/record-add-values-screen.js';
import RecordsScreen from './views/records/records-screen.js';
import BenchmarksScreen from './views/benchmarks/benchmarks-screen.js';
import BenchmarkDetailsScreen from './views/benchmarks/benchmark-details-screen.js';
import AddBenchmarkSelect from './views/benchmarks/benchmark-select-screen.js';
import AddBenchmarkValues from './views/benchmarks/benchmark-add-values-screen.js';
import SettingsScreen from './views/settings/settings-screen.js';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#212121',
    borderTopColor: '#212121',
    borderWidth: 0
  }
});

const RecordsStack = createStackNavigator({
  RecordsMain: RecordsScreen,
  RecordDetails: RecordDetailsScreen,
  AddRecord_newType: AddRecordType,
  AddRecord_newValues: AddRecordValues 
},
{
  initialRouteName: 'RecordsMain',
  headerMode: 'none',
  navigationOptions: ({navigation}) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};

    if (routeName !== 'RecordsMain') {
      navigationOptions.tabBarVisible = false;
    }

    return navigationOptions;
  }
});

const BenchmarksStack = createStackNavigator({
  BenchmarksMain: BenchmarksScreen,
  BenchmarkDetails: BenchmarkDetailsScreen,
  AddBenchmark_select: AddBenchmarkSelect,
  AddBenchmark_newValues: AddBenchmarkValues 
},
{
  initialRouteName: 'BenchmarksMain',
  headerMode: 'none',
  navigationOptions: ({navigation}) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};

    if (routeName !== 'BenchmarksMain') {
      navigationOptions.tabBarVisible = false;
    }

    return navigationOptions;
  }
});

const TabNavigator = createBottomTabNavigator({
  Records: RecordsStack,
  Benchmarks: BenchmarksStack,
  Settings: SettingsScreen,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Records') {
        iconName = `trophy-award`;
      } else if (routeName === 'Benchmarks') {
        iconName = `pulse`;
      } else {
        iconName = `tune`;
      }

      return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    activeTintColor: '#EEFF41',
    inactiveTintColor: 'rgba(255,255,255,.54)',
    style: styles.tabBar
  }
});

export default createAppContainer(TabNavigator);