import { Button, Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { fetcher } from 'common/utils/fetcher';
import { User } from 'common/interface/User';
import { getCookie } from 'common/utils/cookie';
import { useAuth } from 'client/hooks/use-auth';
import { AuthHookType } from 'common/types/other/hook.type';
import { UserHasFriend } from 'common/types/chat/user-has-friend.type';
import { Response } from 'common/types/res/response.type';


type Props = { item: UserHasFriend; closeAddModal: Function };

const Add_Friend = () => {
    ({ item, closeAddModal }: Props) => {

        // Friend state
        const [friend, setFriend] = React.useState<UserHasFriend | null>(null);

        // modal ket ban& nhan tin
        const [modalVisible, setModalVisible] = useState(false);

        const onPressHandler = () => {
            setModalVisible(true);
        };

        const closeModal = () => {
            setModalVisible(false);
        };
        // Khai báo để lấy giá trị email tìm user
        const user: AuthHookType<User> = useAuth();


        const [email, setemail] = useState("");

        const [userFind, setUserFind] = React.useState<User | null>(null);
        const [searchType, setSearchType] = React.useState<string>('EMAIL');

        const nav = useNavigation();
        type NavType = {
            navigate: (screen: string) => void;
        }
        const gobackContact = (nav: NavType) => {
            nav.navigate("Contact");
        };
        // Use Effect
        React.useEffect(() => {
            // Set friend
            setFriend(item);

            // Return clean
            return () => setFriend(null);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        const handleAddFriend = async () => {
            // Thêm xử lý khi nhấn nút "Kết bạn" ở đây
            // Add friend
            const res: Response = await fetcher({
                method: 'POST',
                url: '/friends/send',
                payload: {
                    inviter: {
                        user: user.get?._id,
                        avatar: user.get?.avatar,
                        nickname: user.get?.nickname,
                    },
                    friend: {
                        user: item?._id,
                        avatar: item?.avatar,
                        nickname: item?.nickname,
                    },
                },
            });
            closeModal();
        };

        const handleMessage = async (nav: NavType) => {
            // Thêm xử lý khi nhấn nút "Nhắn tin" ở đây
            const res: Response = await fetcher({
                method: 'POST',
                url: '/chats/join',
                payload: {
                    inviter: {
                        user: user.get?._id,
                        avatar: user.get?.avatar,
                        nickname: user.get?.nickname,
                    },
                    friend: {
                        user: friend?._id,
                        avatar: friend?.avatar,
                        nickname: friend?.nickname,
                    },
                },
            });

            nav.navigate("Message");
            closeModal();
        };
        const searchUser = async () => {

            const res: Response = await fetcher({
                method: "GET",
                url: '/users/find',
                payload: {
                    search: email,
                    type: searchType,
                    user: user.get?._id
                },
            })
            if (res?.status === 200) {
                setUserFind(res?.status === 200 ? res?.data : null);
                console.log(res?.data);
            }
        };
        return (

            <View style={styles.container}>
                {/* - - - - - - - - - Header - - - - - - - - - */}
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
                                source={require("../../Images/back.png")}
                                style={styles.headerIcon}
                            />
                            <Text style={{ marginTop: 42, fontWeight: 'bold', fontSize: 17, color: 'white' }}>Thêm Bạn </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                {/* - - - - - - - - - Body - - - - - - - - - */}
                <View style={styles.body}>
                    <View style={styles.addfrom}>
                        <TextInput
                            style={styles.inputView}
                            placeholder="Nhập Email ....."
                            placeholderTextColor="gray"
                            value={email}
                            onChangeText={(text) => { setemail(text) }}
                        />

                        <TouchableOpacity style={styles.searchBTN} onPress={searchUser}>
                            <LinearGradient
                                colors={["#38A2CF", "#156DBA"]}
                                start={[0, 0]}
                                end={[1, 2]}
                                style={styles.gradient}
                            >
                                <Image
                                    source={require("../../Images/search.png")}
                                    style={styles.seacrhIcon}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    {/* Conditionally render user data if available */}
                    <View>
                        <View style={{ borderBottomWidth: 1, borderColor: "gray", paddingBottom: 10 }}>
                            <Text style={{ marginTop: 15, marginLeft: 8 }}>Người dùng: </Text>
                        </View>


                        <View>
                            {userFind && (
                                <View style={styles.userData}>
                                    {/* Display user data */}
                                    <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }} onPress={onPressHandler}>
                                        <View style={{ marginLeft: 12, marginTop: 10 }}>
                                            <Image
                                                source={require("../../Images/male.png")}
                                                style={{ height: 50, width: 50, resizeMode: 'cover', marginBottom: 10 }}
                                            />
                                        </View>
                                        <View style={{ marginBottom: 8, marginLeft: 12, flex: 1 }}>
                                            <Text style={{ fontWeight: "bold" }}>{userFind.nickname}</Text>
                                            <Text style={{ marginTop: 4, color: "gray" }}> {userFind.phone}</Text>
                                        </View>
                                        <Pressable style={{
                                            backgroundColor: "#38A2CF",
                                            height: 30,
                                            width: 90,
                                            justifyContent: 'center',
                                            alignItems: "center",
                                            marginLeft: 45,
                                            borderRadius: 20,
                                        }} onPress={onPressHandler}>
                                            <Text>Add Friend</Text>
                                        </Pressable>
                                    </Pressable>
                                    {/* Add more user information to display */}
                                </View>
                            )}
                        </View>

                    </View>

                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                            <Text>Info </Text>
                            <View></View>
                            <View style={{ marginTop: 10 }}>
                                <Button title="Kết bạn" onPress={() => handleAddFriend} />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Button title="Nhắn tin" onPress={() => handleMessage(nav)} />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Button title="Close" onPress={closeModal} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default Add_Friend

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
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

    // - - - - - - - - - - Body - - - - - - - - - -
    body: {
        width: "100%",
        marginTop: 115
    },
    userData: {

    },
    addfrom: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        alignContent: 'center',
    },
    inputView: {
        width: "70%",
        height: 50,
        backgroundColor: "#ced4da",
        borderRadius: 10,
        paddingLeft: 20,
        marginRight: 5,
    },
    searchBTN: {
        width: 75,
        height: 50,
        borderRadius: 10,
        overflow: "hidden",
    },
    gradient: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    seacrhIcon: {
        resizeMode: "contain",
        width: 25,
        height: 25,
    },
    // - - - - - - - - - - Footer - - - - - - - - - -
})