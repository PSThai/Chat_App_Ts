import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from "./client/Screen/Login"
import Register from './client/Screen/Register';
import Profile from './client/Screen/Profile';
import Contact from 'client/Screen/Contact';
import Add_Friend from './client/Screen/Add_Friend';
import Message from 'client/Screen/chat_layout/component/Message';
import AuthProvider, { AuthContext } from 'client/context/auth/context';
import Chat_Side from './client/Screen/chat_layout/component/Chat_Side';
import { ChatWrapper } from './client/Screen/chat_layout/component/Chat_Side';
import ConversationsProvider from 'client/context/conversations-context';
import { Chat_Content } from 'client/Screen/chat_layout/component/Message';
import TshusProvider from 'common/context/tshus-context';
import ThemeContext from 'common/context/theme-context';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const [user, setUser] = useState();
    return (
        <NavigationContainer>

            <TshusProvider>
                <ThemeContext>
                    <AuthProvider>
                        <ConversationsProvider>
                            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                                <Stack.Screen name='Login' component={Login} />
                                <Stack.Screen name='Register' component={Register} />
                                <Stack.Screen name='Chat' component={ChatWrapper} />
                                <Stack.Screen name='Profile' component={Profile} />
                                <Stack.Screen name='Contact' component={Contact} />
                                <Stack.Screen name='Add_friend' component={Add_Friend} />
                                <Stack.Screen name='Message' component={Chat_Content} />
                            </Stack.Navigator>
                        </ConversationsProvider>
                    </AuthProvider>
                </ThemeContext>
            </TshusProvider>

        </NavigationContainer >
    )
}

export default StackNavigator

const styles = StyleSheet.create({})