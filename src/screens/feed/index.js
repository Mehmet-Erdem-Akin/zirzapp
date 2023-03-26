import {
    Button,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { firebase } from '@react-native-firebase/auth'
import { useState } from 'react'
import { SvgUri, SvgXml } from 'react-native-svg'
import { DoneAllBlue, DoneAllGray } from '../../components/Icons'
import ChatHeader from '../../components/ChatHeader/ChatHeader'

const Feed = ({ navigation }) => {
    const goMessages = () => {
        console.log('Feed pressed')
        navigation.navigate('Messages')
    }

    const userList = [
        {
            id: '1',
            name: 'John Doe',
            avatar: 'https://img.freepik.com/premium-vector/architect-worker-avatar_18591-58457.jpg?w=826',
            lastSeenTime: '10:30 AM',
            status: 'Online',
            lastMessage: 'See you soon!'
        },
        {
            id: '2',
            name: 'Jane Smith',
            avatar: 'https://img.freepik.com/premium-vector/airliner-pilot-worker-avatar_18591-58460.jpg?w=826',
            lastSeenTime: '9:45 AM',
            status: 'Offline',
            lastMessage: 'I will be there in 5 minutes.'
        },
        {
            id: '3',
            name: 'Bob Johnson',
            avatar: 'https://img.freepik.com/premium-vector/vector-illustration-man-s-avatar-daddy-controlling-young-children-picture-social-networks-just-as-keepsake_469123-492.jpg',
            lastSeenTime: 'Yesterday',
            status: 'Online',
            lastMessage: 'Hello, how are you?'
        }
    ]

    const goDetail = (id) => {
        console.log('id: ', id)
    }

    const renderUserItem = ({ item }) => (
        <TouchableOpacity onPress={() => goDetail(item.id)}>
            <View style={styles.userContainer}>
                <View>
                    <Image
                        source={{ uri: item.avatar }}
                        style={styles.avatar}
                    />

                    <View
                        style={{
                            backgroundColor:
                                item.status === 'Online' ? '#00d64b' : '#ccc',
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            position: 'absolute',
                            right: 5,
                            bottom: 5
                        }}
                    />
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <View style={styles.statusContainer}>
                        <Text>
                            {item.status === 'Online' ? (
                                <SvgXml xml={DoneAllBlue} />
                            ) : (
                                <SvgXml xml={DoneAllGray} />
                            )}
                        </Text>
                        <Text style={styles.lastMessageText}>
                            {item.lastMessage}
                        </Text>
                    </View>
                </View>
                <Text style={styles.lastSeenText}>{item.lastSeenTime}</Text>
            </View>
        </TouchableOpacity>
    )

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        userContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#ece6e6'
        },
        avatar: {
            width: 50,
            height: 50,
            borderRadius: 25
        },
        userInfo: {
            flex: 1,
            marginLeft: 10
        },
        userName: {
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 5
        },
        statusContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        statusDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            marginRight: 5
        },
        onlineStatus: {
            backgroundColor: 'green'
        },
        offlineStatus: {
            backgroundColor: 'gray'
        },
        lastMessageText: {
            color: 'gray',
            marginLeft: 6,
            fontWeight: '400'
        },
        lastSeenText: {
            fontSize: 12,
            color: 'gray'
        }
    })

    return (
        <>
            <View style={styles.container}>
                {/* Add your app content below */}
                <ChatHeader defaultTab={'Chats'} />
                <View style={styles.container}>
                    <FlatList
                        data={userList}
                        keyExtractor={(item) => item.id}
                        renderItem={renderUserItem}
                    />
                </View>
            </View>
        </>
    )
}

export default Feed
