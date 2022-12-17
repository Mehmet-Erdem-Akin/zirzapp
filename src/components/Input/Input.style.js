import { Platform, StyleSheet } from 'react-native'
import colors from '../../styles/colors'

export default StyleSheet.create({
    container: {
        paddingHorizontal: 7,
        margin: 10,
        backgroundColor: colors.gray,
        borderRadius: 5,
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        color: colors.darkGray
        //padding: Platform.OS === 'android' ? 5 : 5,
    }
})
