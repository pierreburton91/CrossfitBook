import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo';

export default class HeaderHero extends React.Component {
    render() {
        return (
            <ImageBackground style={styles.header} source={{ uri: this.props.imageUri }}>
                <LinearGradient start={[.5, 0]} end={[.5, 1]} colors={['transparent', 'rgba(0,0,0,.25)']} style={styles.headerBackground}></LinearGradient>
                <Text style={[styles.text, styles.textHeader]}>{this.props.title}</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
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
        marginBottom: 12,
        color: '#ffffff'
    },
});