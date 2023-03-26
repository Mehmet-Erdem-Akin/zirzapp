import { StyleSheet } from 'react-native'
import colors from './colors'

export const authStackStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    textStyle: {
        padding: 8,
        margin: 16,
        marginBottom: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        color: colors.white
    },
    btnStyle: {
        backgroundColor: colors.gray
    },
    formContainer: {
        padding: 15
    },
    input: {
        flex: 1,
        color: '#000'
    },
    header: {
        color: colors.darkPurple,
        fontSize: 40,
        fontWeight: 'bold',
        margin: 5,
        textAlign: 'center',
        paddingBottom: 30
    }
})
