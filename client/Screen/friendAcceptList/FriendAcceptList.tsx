import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';

const FriendAcceptList = () => {
    const nav = useNavigation();
    type NavType = {
        navigate: (screen: string) => void;
    }
    const gobackContact = (nav: NavType) => {
        nav.navigate("Contact");
    };
    return (
        <View>
            {/* Header */}
            <View style={styles.header}>
                <LinearGradient
                    colors={["#77caea", "#38A2CF", "#156DBA"]}
                    start={[0, 0]}
                    end={[1, 2]}
                    style={styles.gradienthead}
                >
                    {/* Back */}
                    <TouchableOpacity style={styles.backBTN} onPress={() => gobackContact(nav)}>
                        <Image
                            source={require("../../../Images/back.png")}
                            style={styles.headerIcon}
                        />
                        <Text style={{ marginTop: 42, fontWeight: 'bold', fontSize: 17, color: 'white' }}>Lời mời kết bạn</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    )
}

export default FriendAcceptList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
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
    backBTN: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    headerIcon: {
        marginTop: 60,
        margin: 15,
        resizeMode: "contain",
        height: 25,
        width: 25,
    },
})
