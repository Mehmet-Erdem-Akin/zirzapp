import { Text, Button } from 'react-native'

const Home = ({ navigation }) => {
    const goLogin = () => {
        console.log('login pressed')
        navigation.navigate('Login', {
            itemId: 86,
            otherParam: 'anything you want here'
        })
    }
    const goFeed = () => {
        console.log('login pressed')
        navigation.navigate('Feed')
    }
    return (
        <>
            <Text>Home</Text>
            <Button onPress={goLogin} title="Go to Login" />
            <Button onPress={goFeed} title="Go tab navigation" />
        </>
    )
}

export default Home
