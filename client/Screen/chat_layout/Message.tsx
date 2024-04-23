import { Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const Message = () => {
    const nav = useNavigation();



    type NavType = {
        navigate: (screen: string) => void;
    }
    const goback = (nav: NavType) => {
        nav.navigate("Chat");
    };

    return (

        <KeyboardAvoidingView enabled
            style={styles.container}
        >

            <View style={styles.header}>
                <LinearGradient
                    colors={["#77caea", "#38A2CF", "#156DBA"]}
                    start={[0, 0]}
                    end={[1, 2]}
                    style={styles.gradienthead}
                >

                    <TouchableOpacity style={styles.backBTN} onPress={() => goback(nav)}>
                        <Image
                            source={require("../../../Images/back.png")}
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require("../../../Images/male.png")}
                        style={{ height: 50, width: 50, resizeMode: 'cover', marginTop: 40 }}
                    />
                    <Text style={{ marginTop: 40, fontWeight: 'bold', fontSize: 17, color: 'white' }}> Quỳnh Trịnh</Text>
                    <Ionicons name="call-outline" size={24} color="white" style={{ marginLeft: 80, marginTop: 42 }} />
                    <Feather name="video" size={24} color="white" style={{ marginLeft: 15, marginTop: 43 }} />
                    <Ionicons name="menu-outline" size={30} color="white" style={{ marginLeft: 15, marginTop: 43 }} />
                </LinearGradient>
            </View>

            <ScrollView style={styles.message}>
                {/* Cho nay hien tin nhan */}
                
                <Text> Không có tin nhắn nào</Text>
            </ScrollView>


            <View style={styles.viewText} >
                <Entypo style={{ marginRight: 10 }} name="emoji-happy" size={24} color="black" />

                <TextInput style={styles.inputMessage} placeholder='Nhập tin nhắn.....' />

                <AntDesign style={{ marginLeft: 10 }} name="camerao" size={24} color="black" />

                <Pressable style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#38A2CF',
                    }, styles.btnSend
                ]}>
                    <Text style={{ color: "white" }} >Send</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Message

const styles = StyleSheet.create({
    inputMessage: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "#dddddd",
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    header: {
        flex: 1,
        width: "100%",
        height: 100,
        paddingVertical: 10,
        top: -10,
    },
    gradienthead: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 120,
    },
    headerIcon: {
        marginTop: 60,
        margin: 20,
        resizeMode: "contain",
        height: 25,
        width: 25,
    },
    backBTN: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: 'center'
    },
    message: {
        flex:1,
    },
    viewText: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#dddddd",
        marginBottom: 25
    },
    container: {
        flex: 1, flexDirection: 'column'
    },
    btnSend: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        marginLeft: 12,
    }
})