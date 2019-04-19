import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Share } from 'react-native';
import styles from '../../shared-styles/styles.js';
import FAB from '../../shared-components/fab.js';
import DetailsHeader from '../../shared-components/details-header.js';
import ButtonIcon from '../../shared-components/button-icon.js';
import AddBenchmarkCommand from '../../commands/add-benchmark-command.js';
import Swipeout from 'react-native-swipeout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Menu, { MenuItem } from "react-native-material-menu";
import { AdMobBanner, Constants } from 'expo';

export default class BenchmarkDetailsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            record: this.props.navigation.getParam('record', {}),
            data: [
                { title: 'Annie', valuesTypesKey: 1, scaleText: 'I scaled :(I scaled :(I scaled :(I scaled :(', value: '00:10:42', date: '01-01-2018', isScaled: true },
                { title: 'Annie', valuesTypesKey: 1, scaleText: 'I scaled :(I scaled :(I scaled :(I scaled :(I scaled :(', value: '00:10:42', date: '01-01-2018', isScaled: true },
                { title: 'Annie', valuesTypesKey: 1, scaleText: '', value: '00:10:42', date: '01-01-2018', isScaled: false },
                { title: 'Annie', valuesTypesKey: 1, scaleText: 'test', value: '00:10:42', date: '01-01-2018', isScaled: false }
            ],
            showAd: true
        }

        this._handleShare = this._handleShare.bind(this);
        this._setMenuVisible = this._setMenuVisible.bind(this);
        this._handleCloseAction = this._handleCloseAction.bind(this);
        this._handleAddNewRecord = this._handleAddNewRecord.bind(this);
        this._handleDeleteRecord = this._handleDeleteRecord.bind(this);
        this._handleUpdateRecord = this._handleUpdateRecord.bind(this);
    }

    _setMenuVisible() {
        this._menu.show();
    }

    _handleCloseAction() {
        this.props.navigation.goBack();
    }

    _handleAddNewRecord() {
        const command = new AddBenchmarkCommand();
        command.title = this.state.record.title;
        command.wod = this.state.record.wod;
        command.valuesTypesKey = this.state.record.valuesTypesKey;
        command.unit = this.state.record.value.split(' ')[1];
        this.props.navigation.navigate('AddBenchmark_newValues', { command: command });
    }

    _handleUpdateRecord(item) {
        const command = new AddBenchmarkCommand();
        command.title = item.title;
        command.wod = item.wod;
        command.valuesTypesKey = item.valuesTypesKey;
        command.value = item.value.split(' ')[0];
        command.date = item.date;
        command.isScaled = item.isScaled;
        command.scaleText = item.scaleText;
        this.props.navigation.navigate('AddBenchmark_newValues', { command: command });
    }

    _handleDeleteRecord(item) {
        Alert.alert('Delete previous score', 'Are you sure you want to delete this score ?', [{ text: 'Confirm', onPress: () => this._deleteRecord(item) }, { text: 'My bad!', style: 'cancel' }], { cancelable: true });
    }

    _deleteRecord(item) {
        const index = this.state.data.indexOf(item);
        const tempArray = JSON.parse(JSON.stringify(this.state.data))
        tempArray.splice(index, 1);
        this.setState({ data: tempArray });
    }

    _handleShare = async () => {
        try {
            const result = await Share.share({
                title: 'Test Share',
                message: `Scored ${this.state.record.value} on ${this.state.record.title}\nhttps://google.com`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    _renderPreviousRecords(item, index) {
        const swipeRightOptns = [
            {
                backgroundColor: '#e53935',
                underlayColor: '#ab000d',
                onPress: () => { this._handleDeleteRecord(item) },
                component: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} ><MaterialCommunityIcons size={28} name='trash-can-outline' color='#ffffff' /></View>
            }
        ];
        const swipeLeftOptns = [
            {
                backgroundColor: '#eeff41',
                underlayColor: '#b8cc00',
                onPress: () => { this._handleUpdateRecord(item) },
                component: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} ><MaterialCommunityIcons size={28} name='square-edit-outline' color='#000000' /></View>
            }
        ];

        return (
            <Swipeout key={this.props.index} right={swipeRightOptns} left={swipeLeftOptns} sensitivity={12} autoClose={true} backgroundColor='transparent'>
                <View key={index} style={componentStyles.previousScoreContainer}>
                    <View style={{ display: item.isScaled ? 'flex' : 'none', flex: 1 }}>
                        <Text style={[styles.textMuted, componentStyles.previousScoreText]}>{item.date}</Text>
                        <Text style={[styles.textMuted, componentStyles.scaledText]}>{item.scaleText}</Text>
                    </View>
                    <Text style={[{ display: !item.isScaled ? 'flex' : 'none' }, styles.textMuted, componentStyles.previousScoreText]}>{item.date}</Text>
                    <Text style={[styles[item.isScaled ? 'textPurple' : 'textYellow'], componentStyles.previousScoreText]}>{item.value}</Text>
                </View>
            </Swipeout>
        );
    }

    render() {
        const record = this.state.data[0];
        const previousRecords = this.state.data.slice(1);
        const hasMultipleRecords = previousRecords.length > 1 ? true : false;

        return (
            <View style={styles.container}>
                <DetailsHeader action={this._handleCloseAction} title={record.title} isForm={false} />
                <View style={componentStyles.scoreContainer}>
                    <Text style={[styles[record.isScaled ? 'textPurple' : 'textYellow'], componentStyles.mainScore]}>{record.value}</Text>

                    <Menu ref={ref => this._menu = ref} style={styles.bgDarkLight} button={
                        <ButtonIcon action={() => this._setMenuVisible()} name='md-more' style={{ marginRight: 8, marginTop: 4 }} />
                    }>
                        <MenuItem underlayColor={'rgba(255,255,255,.54)'} textStyle={styles.text} onPress={() => { this._menu.hide(); this._handleUpdateRecord(record) }}>Edit</MenuItem>
                        <MenuItem underlayColor={'rgba(255,255,255,.54)'} textStyle={styles.text} onPress={() => { this._menu.hide(); this._handleDeleteRecord(record) }}>Delete</MenuItem>
                        <MenuItem underlayColor={'rgba(255,255,255,.54)'} textStyle={styles.text} onPress={() => { this._menu.hide(); this._handleShare() }}>Share</MenuItem>
                    </Menu>
                </View>
                <Text style={[styles.textMuted, componentStyles.mainScoreDate, componentStyles.scaledText]}>{record.scaleText}</Text>
                <Text style={[styles.textMuted, componentStyles.mainScoreDate]}>Performed on {record.date}</Text>
                <View style={{ display: this.state.showAd ? 'flex' : 'none', alignItems: 'center', marginBottom: 16 }}>
                    <AdMobBanner
                        bannerSize="banner"
                        adUnitID="ca-app-pub-3940256099942544/6300978111" // ca-app-pub-3940256099942544/6300978111
                        // testDeviceID={Constants.installationId}
                        onDidFailToReceiveAdWithError={() => this.setState({ showAd: false })} />
                </View>
                <View style={{ display: hasMultipleRecords ? 'flex' : 'none' }}>
                    <Text style={[styles.textYellow, componentStyles.previousScoreHeader]}>Previous scores</Text>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 80 }}
                        data={previousRecords}
                        renderItem={({ item, index }) =>
                            this._renderPreviousRecords(item, index)
                        }
                        keyExtractor={(item, index) => item + index}
                    />
                </View>
                <FAB onPress={() => this._handleAddNewRecord(record)} />
            </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    scoreContainer: {
        position: 'relative',
        flexDirection: 'row',
        marginTop: 28,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16
    },
    mainScore: {
        fontWeight: '500',
        fontSize: 48
    },
    mainScoreDate: {
        marginLeft: 16,
        fontSize: 16,
        marginBottom: 24
    },
    previousScoreHeader: {
        marginLeft: 16,
        marginBottom: 16,
        fontWeight: '500'
    },
    previousScoreContainer: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
    },
    previousScoreText: {
        fontSize: 16
    },
    scaledText: {
        opacity: .5,
        fontStyle: 'italic'
    }
});