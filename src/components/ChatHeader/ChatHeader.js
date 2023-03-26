import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import colors from '../../styles/colors'
import { SvgXml } from 'react-native-svg'
import { camera, logout, search, settings } from '../Icons'
import { firebase } from '@react-native-firebase/auth'

const ChatHeader = ({ defaultTab, navigation }) => {
    const [activeTab, setActiveTab] = useState(defaultTab)

    const handleTabPress = (tabName) => {
        setActiveTab(tabName)
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
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.appName}>{'Zirzapp'}</Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity>
                        <SvgXml style={styles.headerButton} xml={camera} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SvgXml style={styles.headerButton} xml={search} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SvgXml style={styles.headerButton} xml={settings} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signOutUser}>
                        <SvgXml style={styles.headerButton} xml={logout} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.tabMenu}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'Chats' && styles.activeTab
                    ]}
                    onPress={() => handleTabPress('Chats')}
                >
                    <Text style={styles.tabButtonText}>Chats</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'Calls' && styles.activeTab
                    ]}
                    onPress={() => handleTabPress('Calls')}
                >
                    <Text style={styles.tabButtonText}>Calls</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'Status' && styles.activeTab
                    ]}
                    onPress={() => handleTabPress('Status')}
                >
                    <Text style={styles.tabButtonText}>Status</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.darkPurple,
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 50
    },
    appName: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
    headerButtons: {
        borderRadius: 8,
        flexDirection: 'row'
    },
    headerButton: {
        marginLeft: 8
    },
    tabMenu: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ece6e6'
    },
    tabButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8
    },
    activeTab: {
        border: '2px solid red',
        borderBottomWidth: 2,
        borderBottomColor: colors.darkPurple
    },
    tabButtonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600'
    }
})

export default ChatHeader
