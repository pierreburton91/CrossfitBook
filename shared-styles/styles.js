import { StyleSheet } from 'react-native';
import colors from './colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
        marginBottom: -8
    },
    text : {
        color: colors.white
    },
    textYellow: {
        color: colors.accent
    },
    textPurple: {
        color: colors.purple
    },
    textMuted: {
        color: colors.muted
    },
    tabBarShadow: {
        position: 'absolute',
        bottom: 8,
        left: 0,
        height: 8,
        width: '100%',
        backgroundColor: 'transparent'
    },
    inputTitle: {
        fontWeight: '700',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 32
    },
    textInput: {
      paddingBottom: 8,
      paddingTop: 8,
      paddingLeft: 4,
      paddingRight: 4,
      color: colors.white,
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      fontSize: 14,
    //   backgroundColor: colors.muted
    },
    bgDark: {
        backgroundColor: colors.dark
    },
    bgDarkLight: {
        backgroundColor: colors.darkLight
    }
});