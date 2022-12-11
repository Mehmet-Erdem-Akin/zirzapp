import { Button, Text } from 'react-native'

const Feed = ({ navigation }) => {
    const goMessages = () => {
        console.log('Feed pressed')
        navigation.navigate('Messages')
    }
    return (
        <>
            <Text>Feed</Text>
            <Button onPress={goMessages} title="Go to Messages" />
        </>
    )
}

export default Feed
