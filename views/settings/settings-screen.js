import React from 'react';
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../shared-styles/styles.js';
import HeaderHero from '../../shared-components/header.js';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
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
            outputRange: [0 , 1],
            extrapolate: 'clamp'
        });

        const AnimatedHeaderHero = Animated.createAnimatedComponent(HeaderHero);

        return (
            <View style={styles.container}>
                <AnimatedHeaderHero title={"Settings"} height={headerHeight} banner={'settings'} blur={headerBlur} />
                <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.16)']} style={styles.tabBarShadow}></LinearGradient>
            </View>
        );
    }
}

/* #################################
Unsplash credits
Victor Freitas
Alora Griffiths
####################################*/