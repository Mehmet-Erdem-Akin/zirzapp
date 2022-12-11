import { Button, Text } from 'react-native'

const Register = ({ navigation }) => {
    const goMainStack = () => {
        console.log('Register pressed')
        navigation.navigate('MainStack')
    }
    return (
        <>
            <Text>Register</Text>
            <Button onPress={goMainStack} title="Go to MainStack" />
        </>
    )
}

export default Register
