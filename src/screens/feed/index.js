import { Button, Text } from 'react-native'
import { firebase } from '@react-native-firebase/auth'

const Feed = ({ navigation }) => {
    const goMessages = () => {
        console.log('Feed pressed')
        navigation.navigate('Messages')
    }
    const signOutUser = async () => {
        try {
            await firebase.auth().signOut()
            navigation.navigate('Auth')
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <Text>Feed</Text>
            <Button onPress={goMessages} title="Go to Messages" />
            <Button onPress={signOutUser} title="Logout" />
        </>
    )
}

export default Feed
