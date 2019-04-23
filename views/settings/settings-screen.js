import React from 'react';
import { View, Animated, Text, StyleSheet, Picker, Linking, Modal } from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../shared-styles/styles.js';
import colors from '../../shared-styles/colors.js';
import HeaderHero from '../../shared-components/header.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import Touchable from '../../shared-components/touchable.js';
import DetailsHeader from '../../shared-components/details-header.js';
import Rate from 'react-native-rate'

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
            weightUnit: 0,
            showAdsModal: false,
            showCreditsModal: false
        }

        this._rateApp = this._rateApp.bind(this);
        this._reportBug = this._reportBug.bind(this);
    }

    _rateApp() {
        const options = {
            AppleAppID: "2193813192",
            GooglePackageName: "com.mywebsite.myapp"
        }
        Rate.rate(options);
    }

    _reportBug() {
        Linking.openURL('mailto:pierre.burton91@gmail.com&subject=CrossfitBook - Bug report');
    }

    _showCreditsModal(visibility) {
        this.setState({ showCreditsModal: visibility });
    }

    _showAdsModal(visibility) {
        this.setState({ showAdsModal: visibility });
    }

    render() {
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

        return (
            <View style={styles.container}>
                <Animated.ScrollView style={{ paddingTop: 200 }} onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                )}>
                    <Text style={[styles.textYellow, styles.inputTitle]}>Configuration</Text>
                    <View style={[componentStyles.itemContainer]}>
                        <Text style={[styles.text, { paddingTop: 4 }]}>Weight unit</Text>
                        <View style={componentStyles.pickerContainer}>
                            <Picker
                                selectedValue={this.state.weightUnit}
                                style={{ width: 100, height: 32, backgroundColor: 'transparent', color: colors.white, opacity: 0 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ weightUnit: itemValue })
                                }
                                mode='dropdown'>
                                <Picker.Item label="Kilograms" value="0" />
                                <Picker.Item label="Pounds" value="1" />
                            </Picker>
                            <View style={componentStyles.falsePicker} pointerEvents='none'>
                                <Text style={styles.text}>{this.state.weightUnit == 0 ? 'Kilograms' : 'Pounds'}</Text>
                                <Ionicons name='md-arrow-dropdown' color={colors.muted} size={16}></Ionicons>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.textYellow, styles.inputTitle, { marginBottom: 4 }]}>About</Text>
                    <Touchable action={() => this._rateApp()}>
                        <View style={[componentStyles.itemContainer]}>
                            <Text style={[styles.text]}>Rate the app</Text>
                        </View>
                    </Touchable>
                    <Touchable action={() => this._showCreditsModal(true)}>
                        <View style={[componentStyles.itemContainer]}>
                            <Text style={[styles.text]}>Image credits</Text>
                        </View>
                    </Touchable>
                    <Touchable action={() => this._showAdsModal(true)}>
                        <View style={[componentStyles.itemContainer]}>
                            <Text style={[styles.text]}>Ads suck!</Text>
                        </View>
                    </Touchable>
                    <Touchable action={() => this._reportBug()}>
                        <View style={[componentStyles.itemContainer]}>
                            <Text style={[styles.text]}>Report a bug</Text>
                        </View>
                    </Touchable>
                </Animated.ScrollView>
                <AnimatedHeaderHero title={"Settings"} height={headerHeight} banner={'settings'} blur={headerBlur} />
                <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.16)']} style={styles.tabBarShadow}></LinearGradient>

                <Modal
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => console.log('close')}
                    visible={this.state.showAdsModal}>
                    <View style={[componentStyles.modalOverlay]}>
                        <View style={[componentStyles.modalContainer, styles.bgDarkLight]}>
                            <DetailsHeader style={{ paddingTop: 16 }} action={() => this._showAdsModal(!this.state.showAdsModal)} title='Ads suck!' isForm={false} />
                            <Text style={[styles.text, { marginLeft: 16, marginRight: 16, marginTop: 16 }]}>Yeah, we know.</Text>
                            <Text style={[styles.text, { marginLeft: 16, marginRight: 16, marginTop: 16 }]}>But running an app like this one costs money. So, to offer you this product as free, we rely on those ads to generate some earnings.</Text>
                            <Text style={[styles.text, { marginLeft: 16, marginRight: 16, marginTop: 16 }]}>We are currently looking to propose an ads-free experience by asking for a low fare or something.</Text>
                            <Text style={[styles.text, { marginLeft: 16, marginRight: 16, marginTop: 16 }]}>So stay tuned !</Text>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => console.log('close')}
                    visible={this.state.showCreditsModal}>
                    <View style={[componentStyles.modalOverlay]}>
                        <View style={[componentStyles.modalContainer, styles.bgDarkLight]}>
                            <DetailsHeader style={{ paddingTop: 16 }} action={() => this._showCreditsModal(!this.state.showCreditsModal)} title='Credits' isForm={false} />
                            <Text style={[styles.text, { marginLeft: 16, marginRight: 16, marginTop: 16 }]}>The photos displayed in the app are the work of several artists which you can find their profiles down below.</Text>
                            <Text style={[styles.text, { marginLeft: 16, marginRight: 16, marginTop: 16 }]}>We thank them for their amazing work !</Text>
                            <Touchable action={() => Linking.openURL('https://unsplash.com/@victorfreitas')}>
                                <Text style={[styles.text, { marginLeft: 16, marginRight: 16, marginTop: 16 }, styles.textYellow]}>Victor Freitas</Text>
                            </Touchable>
                            <Touchable action={() => Linking.openURL('https://unsplash.com/@aloragriffiths')}>
                                <Text style={[styles.text, { marginLeft: 16, marginRight: 16, marginTop: 16 }, styles.textYellow]}>Alora Griffiths</Text>
                            </Touchable>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    itemContainer: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pickerContainer: {
        position: 'relative'
    },
    falsePicker: {
        position: 'absolute',
        width: '100%',
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        margin: 16,
        paddingBottom: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

/* #################################
Unsplash credits
Victor Freitas
Alora Griffiths
####################################*/