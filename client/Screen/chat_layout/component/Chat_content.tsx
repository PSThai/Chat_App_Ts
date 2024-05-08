import { Image, KeyboardAvoidingView, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ConversationsProvider from 'client/context/conversations-context'
import { Messages } from 'common/interface/Messages'
import { useConversations } from 'client/hooks/user-conversations'
import { useAuth } from 'client/hooks/use-auth'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    mes: Messages[];
    cvsId: any;
    setMes: React.Dispatch<React.SetStateAction<any[]>>;
};

const Chat_content = () => {


}
export default Chat_content

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    // - - - - - - - - - - Header - - - - - - - - - -
    header: {
        overflow: "hidden",
        width: "100%",
        height: 110,
        paddingVertical: 10,
        position: "absolute",
        top: -10,
    },
    gradienthead: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        height: 90,
    },
    headerIcon: {
        marginTop: 60,
        margin: 20,
        resizeMode: "contain",
        height: 25,
        width: 25,
    },
    addButton: {
        padding: 10,
    },
    // - - - - - - Modal - - - - - -
    centeredView: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
        marginTop: 10,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu đen mờ

    },
    modalView: {
        alignItems: "center",
        margin: 30,
        backgroundColor: "white",
        borderRadius: 3,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        alignItems: "center",
        borderColor: "gray",
        width: "100%",
        padding: 10,
        marginBottom: 10,
    },
    // - - - - - - - - - - Body - - - - - - - - - -
    body: {
        flex: 1,
        flexDirection: 'column',
    },
    item: {
        alignItems: "center",
        flexDirection: "row",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    image: {
        margin: 5,
        borderRadius: 50,
        width: 70,
        height: 70,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    badge: {
        padding: 3.5,
        backgroundColor: 'green', // Change the color as needed
    },
    textContainer: {
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    nameText: {
        fontSize: 13,
    },
    messageText: {
        fontSize: 11,
    },
    skeletonContainer: {
        flexDirection: 'column',
        padding: 10,
    },
    // - - - - - - - - - - Footer - - - - - - - - - -
    footer: {
        overflow: "hidden",
        width: "100%",
        height: 110,
        position: "absolute",
        bottom: -10,
        paddingVertical: 10,
    },
    gradient: {
        flexDirection: "row",
        height: 100,
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    footerText: {
        margin: 5,
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    footerIcon: {
        resizeMode: "contain",
        height: 32,
        width: 32,
    },
})