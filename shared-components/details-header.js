import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import ButtonFlat from './button-flat.js';
import ButtonIcon from './button-icon.js';

export default class DetailsHeader extends React.Component {
    render() {
        const closeButton = this.props.isForm ? <ButtonFlat action={this.props.action} style={{alignSelf: 'flex-start', marginTop: 8}} label={this.props.label} /> : <ButtonIcon action={this.props.action} name='md-close' style={{alignSelf: 'flex-start', marginTop: 4, marginRight: 8}} />

        return (
            <View style={styles.header}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.textHeader}>{this.props.title}</Text>
                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.textHeaderSub}>{this.props.subTitle}</Text>
                </View>
                {closeButton}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 32
    },
    textContainer: {
        flex: 1
    },
    textHeader: {
        fontSize: 34,
        fontWeight: '700',
        marginLeft: 16,
        marginRight: 8,
        color: '#ffffff'
    },
    textHeaderSub: {
        fontSize: 20,
        marginLeft: 16,
        color: 'rgba(255,255,255,.54)'
    }
});