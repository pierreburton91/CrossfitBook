import React from 'react';
import { View, Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class FAB extends React.Component {
    render() {
        let fab;
        if (Platform.OS === 'ios') {
          fab = <TouchableOpacity onPress={this.props.onPress} >
            <View style={styles.fab}>
                <Ionicons style={styles.fabIcon} name='ios-add' />
            </View>
          </TouchableOpacity>
        } else {
          fab = <TouchableNativeFeedback onPress={this.props.onPress} background={TouchableNativeFeedback.SelectableBackground()}>
              <View style={styles.fab}>
                <Ionicons style={styles.fabIcon} name='md-add' />
              </View>
            </TouchableNativeFeedback>
        }
        return (
            fab
        );
    }
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 16,
      borderRadius: 50,
      height: 56,
      width: 56,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EEFF41',
      shadowColor: '#000000',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0,
      },
      elevation: 2,
    },
    fabIcon: {
      fontSize: 24
    }
});