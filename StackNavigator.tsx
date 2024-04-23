import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from "./client/Screen/Login"
import Register from './client/Screen/Register';
import ChatSide from './client/Screen/chat_layout/Chat_Side';
import Profile from './client/Screen/Profile';
import Contact from 'client/Screen/Contact';
import Add_Friend from 'client/Screen/Add_Friend';
import Message from 'client/Screen/chat_layout/Message';
import AuthProvider, { AuthContext } from 'client/context/auth/context';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const [user, setUser] = useState();
    return (
        <NavigationContainer>
            <AuthProvider>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Register' component={Register} />
                    <Stack.Screen name='Chat' component={ChatSide} />
                    <Stack.Screen name='Profile' component={Profile} />
                    <Stack.Screen name='Contact' component={Contact} />
                    <Stack.Screen name='Add_friend' component={Add_Friend} />
                    <Stack.Screen name='Message' component={Message} />

                </Stack.Navigator>
            </AuthProvider>
        </NavigationContainer >
    )
}

export default StackNavigator

const styles = StyleSheet.create({})