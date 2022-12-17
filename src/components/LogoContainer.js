import { Image, View } from 'react-native'

const LogoContainer = () => {
    return (
        <Image
            style={{
                alignSelf: 'center',
                height: 200,
                width: 200,
                marginTop: 20
            }}
            source={require('../assets/logo.png')}
        />
    )
}

export default LogoContainer
