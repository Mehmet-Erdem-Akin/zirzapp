/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react'
import type { Node } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native'

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions
} from 'react-native/Libraries/NewAppScreen'
import Home from './src/screens/home'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from './src/screens/register'
import Login from './src/screens/login'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from './src/screens/feed'
import Messages from './src/screens/messages'
import auth from '@react-native-firebase/auth'
import Loading from './src/components/Loading'

const App: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark'
    const Stack = createNativeStackNavigator()
    const Tab = createBottomTabNavigator()
    const [loading, setLoading] = useState(true)
    const [initializing, setInitializing] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const onAuthStateChanged = (user) => {
        setIsLoggedIn(user)
        if (initializing) {
            setInitializing(false)
        }
        setLoading(false)
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return () => subscriber
    }, [])

    if (loading) {
        return <Loading />
    }
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    }

    const AuthStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    initialParams={{ isAuth: false }}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        )
    }
    const MainStack = () => {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Feed" component={Feed} />
                <Tab.Screen name="Messages" component={Messages} />
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="MainStack"
                        component={MainStack}
                    />
                ) : (
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="AuthStack"
                        component={AuthStack}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
