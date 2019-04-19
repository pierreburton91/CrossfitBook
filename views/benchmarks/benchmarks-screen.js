import React from 'react';
import { View, FlatList, Animated, Alert, ActivityIndicator, Text, ScrollView, RefreshControl } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { LinearGradient, AdMobBanner } from 'expo';
import styles from '../../shared-styles/styles.js';
import FAB from '../../shared-components/fab.js';
import HeaderHero from '../../shared-components/header.js';
import AddBenchmarkCommand from '../../commands/add-benchmark-command.js';
import dataStub from '../../static/benchmarks-stub.js';
import BenchmarkComponent from './components/benchmark-component.js';
import colors from '../../shared-styles/colors.js';

export default class BenchmarksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      data: [],
      showAd: true,
      isLoading: false,
      isRefreshing: false,
      isError: false
    }

    this._handleRecordSelect = this._handleRecordSelect.bind(this);
    this._handleAddNewRecord = this._handleAddNewRecord.bind(this);
    this._handleDeleteRecord = this._handleDeleteRecord.bind(this);
    this._loadAndReturn = this._loadAndReturn.bind(this);
  }

  componentDidMount() {
    this._loadAndReturn('isLoading');
  }

  _handleRecordSelect(element) {
    this.props.navigation.navigate('BenchmarkDetails', { record: element });
  }

  _handleDeleteRecord(record) {
    Alert.alert('Confirm deletion', 'This action will delete the record and all historical data associated.\nIt can\'t be undone.', [{ text: 'Confirm', onPress: () => this._deleteRecord(record) }, { text: 'Cancel', style: 'cancel' }], { cancelable: true });
  }

  _deleteRecord(record) {
    const index = this.state.data.indexOf(record);
    const temp = this.state.data.slice();
    temp.splice(index, 1);
    this.setState({ data: temp });
    this.state.scrollY.setValue(0);
  }

  _handleNewRecord() {
    this.props.navigation.navigate('AddBenchmark_select', { command: new AddBenchmarkCommand() });
  }

  _handleAddNewRecord(record) {
    const command = new AddBenchmarkCommand();
    command.title = record.title;
    command.wod = record.wod;
    command.valuesTypesKey = record.valuesTypesKey;
    command.unit = record.value.split(' ')[1];
    command.isScaled = record.isScaled;
    command.scaleText = record.scaleText;
    this.props.navigation.navigate('AddBenchmark_newValues', { command: command });
  }

  _renderRecords(item, index) {
    if (index % 20 == 0) {
      return (
        <View>
          <View style={{ display: this.state.showAd ? 'flex' : 'none', alignItems: 'center', marginTop: 8 }}>
            <AdMobBanner
              bannerSize="banner"
              adUnitID="ca-app-pub-3940256099942544/6300978111" // ca-app-pub-3940256099942544/6300978111
              // testDeviceID={Constants.installationId}
              onDidFailToReceiveAdWithError={() => this.setState({ showAd: false })} />
          </View>
          <BenchmarkComponent _handleAddNewRecord={this._handleAddNewRecord} _handleDeleteRecord={this._handleDeleteRecord} _handleRecordSelect={this._handleRecordSelect} key={index} record={item} />
        </View>
      )
    }
    return (<BenchmarkComponent _handleAddNewRecord={this._handleAddNewRecord} _handleDeleteRecord={this._handleDeleteRecord} _handleRecordSelect={this._handleRecordSelect} key={index} record={item} />)
  }

  async _loadAndReturn(loadType) {
    this.setState({ [loadType]: true, isError: false });
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

    if (response.status == 200) {
      setTimeout(() => this.setState({ [loadType]: false, data: dataStub }), 2500);
    } else {
      this.setState({ [loadType]: false, isError: true });
    }
  }

  _checkForRefresh() {
    const shouldRefresh = this.props.navigation.getParam('shouldRefresh', false);

    if (shouldRefresh) {
      this._loadAndReturn('isLoading');
    }
  }

  _renderView(list) {
    if (this.state.isError) {
      return (<ScrollView contentContainerStyle={{ flex: 1, paddingTop: 200 }} refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={() => this._loadAndReturn('isRefreshing')}
          progressViewOffset={200}
          progressBackgroundColor={colors.darkLight}
          colors={[colors.accent]} />}>
        <Text style={[styles.textMuted, { textAlign: 'center', paddingLeft: 16, paddingRight: 16, paddingTop: 64 }]}>{'( "> _ <" )\n\nOuch!\n\nIt looks like we have issues retrieving your data.\nPlease try again in a few moment.\n\nIf the problem persists, contact us through the settings.'}</Text>
      </ScrollView>)
    }

    if (this.state.isLoading) {
      return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" color={colors.accent} /></View>)
    }

    if (!this.state.isLoading && list.length > 0) {
      const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
      return (<AnimatedFlatList
        contentContainerStyle={{ paddingTop: 200, paddingBottom: 80 }}
        data={list}
        renderItem={({ item, index }) =>
          this._renderRecords(item, index)
        }
        scrollEventThrottle={0}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
        )}
        keyExtractor={(item, index) => item + index}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={() => this._loadAndReturn('isRefreshing')}
            progressViewOffset={200}
            progressBackgroundColor={colors.darkLight}
            colors={[colors.accent]} />}
      />)
    }
    
    if (!this.state.isLoading && list.length == 0) {
      return (<ScrollView contentContainerStyle={{ flex: 1, paddingTop: 200 }} refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={() => this._loadAndReturn('isRefreshing')}
          progressViewOffset={200}
          progressBackgroundColor={colors.darkLight}
          colors={[colors.accent]} />}>
        <Text style={[styles.textMuted, { textAlign: 'center', paddingLeft: 16, paddingRight: 16, paddingTop: 64 }]}>( ⚆ _ ⚆ ){'\n\n'}There's nothing here yet...{'\n\n\n'}Add your first Benchmark result{'\n'}on tapping the yellow button underneath !</Text>
      </ScrollView>)
    }    
  }

  render() {
    const recordsList = this.state.data.slice();
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 112],
      outputRange: [200, 88],
      extrapolate: 'clamp'
    });

    const headerBlur = this.state.scrollY.interpolate({
      inputRange: [0, 112],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    const AnimatedHeaderHero = Animated.createAnimatedComponent(HeaderHero);
    const view = this._renderView(recordsList);


    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => this._checkForRefresh()}
        />
        {view}
        <AnimatedHeaderHero title={"Benchmarks"} banner={'benchmarks'} height={headerHeight} blur={headerBlur} />
        <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.16)']} style={styles.tabBarShadow}></LinearGradient>
        <FAB onPress={() => { this._handleNewRecord() }} />
      </View>
    );
  }
}