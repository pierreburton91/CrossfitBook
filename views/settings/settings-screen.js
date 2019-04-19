import React from 'react';
import { View, Animated, Text, StyleSheet, Picker } from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../shared-styles/styles.js';
import colors from '../../shared-styles/colors.js';
import HeaderHero from '../../shared-components/header.js';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
            weightUnit: 0
        }
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
                        <Text style={[styles.text, {paddingTop: 4}]}>Weight unit</Text>
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
                </Animated.ScrollView>
                <AnimatedHeaderHero title={"Settings"} height={headerHeight} banner={'settings'} blur={headerBlur} />
                <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.16)']} style={styles.tabBarShadow}></LinearGradient>
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
    }
})

/* #################################
Unsplash credits
Victor Freitas
Alora Griffiths
####################################*/