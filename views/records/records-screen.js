import React from 'react';
import { View, FlatList, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../shared-styles/styles.js';
import FAB from '../../shared-components/fab.js';
import HeaderHero from '../../shared-components/header.js';
import RecordComponent from './components/record-component.js';
import AddRecordCommand from '../../commands/add-record-command.js';
import dataStub from '../../static/pr-stub.js';
import { AdMobBanner, Constants } from 'expo';

export default class RecordsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
            data: [],
            showAd: true
        }

        this._handleRecordSelect = this._handleRecordSelect.bind(this);
        this._handleDeleteRecord = this._handleDeleteRecord.bind(this);
    }

    componentDidMount() {
        this.setState({ data: dataStub })
    }
    
    _handleRecordSelect(element) {
        this.props.navigation.navigate('Details', {record: element});
    }

    _handleDeleteRecord(record) {
        Alert.alert('Confirm deletion', 'This action will delete the record and all historical data associated.\nIt can\'t be undone.', [{text: 'Confirm', onPress: () => this._deleteRecord(record)}, {text: 'Cancel', style: 'cancel'}], {cancelable: true});
    }

    _deleteRecord(record) {
        const index = this.state.data.indexOf(record);
        const temp = this.state.data.slice();
        temp.splice(index, 1);
        this.setState({data: temp});
        this.state.scrollY.setValue(0);
    }

    _handleNewRecord() {
        this.props.navigation.navigate('AddRecord_newType', {command: new AddRecordCommand()});
    }

    _renderRecords(item, index) {
        if (index%20 == 0) {
            return (
                <View>
                    <View style={{ display: this.state.showAd ? 'flex' : 'none', alignItems: 'center', marginTop: 8}}>
                        <AdMobBanner
                            bannerSize="banner"
                            adUnitID="ca-app-pub-3940256099942544/6300978111" // ca-app-pub-3940256099942544/6300978111
                            testDeviceID={Constants.installationId}
                            onDidFailToReceiveAdWithError={() => this.setState({ showAd: false })} />
                    </View>
                <RecordComponent _handleDeleteRecord={this._handleDeleteRecord} _handleRecordSelect={this._handleRecordSelect} key={index} record={item} />
                </View>
            )
        }
        return (<RecordComponent _handleDeleteRecord={this._handleDeleteRecord} _handleRecordSelect={this._handleRecordSelect} key={index} record={item} />)
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
            outputRange: [0 , 1],
            extrapolate: 'clamp'
        });
        
        const AnimatedHeaderHero = Animated.createAnimatedComponent(HeaderHero);
        const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

        return (
        <View style={styles.container}>
            <AnimatedFlatList
                contentContainerStyle={{paddingTop: 200, paddingBottom: 80}}
                data={recordsList}
                renderItem={({item, index}) =>
                    this._renderRecords(item, index)
                }
                scrollEventThrottle={0}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                )}
                keyExtractor={(item, index) => item + index}
            />
            <AnimatedHeaderHero title={"Personal records"} banner={'records'} height={headerHeight} blur={headerBlur} />
            <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.16)']} style={styles.tabBarShadow}></LinearGradient>
            <FAB onPress={() => { this._handleNewRecord() }} />
        </View>
        );
    }
}