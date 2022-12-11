import { Button, Text } from 'react-native'

const Messages = ({ navigation }) => {
    const goHome = () => {
        console.log('Messages pressed')
        // navigation.navigate('Home')
    }
    return (
        <>
            <Text>Messages</Text>
            <Button onPress={goHome} title="Go to Home" />
        </>
    )
}

export default Messages
