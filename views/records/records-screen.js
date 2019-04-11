import React from 'react';
import { View, FlatList, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../shared-styles/styles.js';
import FAB from '../../shared-components/fab.js';
import HeaderHero from '../../shared-components/header.js';
import RecordComponent from './components/record-component.js';
import AddRecordCommand from '../../commands/add-record-command.js';
import dataStub from '../../static/data-stub.js';

export default class RecordsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
            data: []
        }

        this._handleDeleteRecord = this._handleDeleteRecord.bind(this);
    }

    componentDidMount() {
        this.setState({ data: dataStub })
    }
    
    _handleRecordSelect(element, navigation) {
        navigation.navigate('Details', {record: element});
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
                    <RecordComponent _handleDeleteRecord={this._handleDeleteRecord} _handleRecordSelect={this._handleRecordSelect} navigation={this.props.navigation} key={index} record={item} />
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