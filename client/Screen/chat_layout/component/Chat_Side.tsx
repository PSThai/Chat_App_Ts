import { FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useConfig } from 'common/hooks/use-config';
import { fetcher } from 'common/utils/fetcher';
import { Response } from 'common/types/res/response.type';
import { Avatar, Badge, Flex, Skeleton } from 'antd';
import { ConversationEnum } from 'common/enum/conversation.enum';
import { ThemeEnum } from 'common/enum/theme.enum';
import EmptyHorizontal from 'client/context/empty/horizontal.empty';
import { useAuth } from 'client/hooks/use-auth';
import { useConversations } from 'client/hooks/user-conversations';
import ConversationsProvider from 'client/context/conversations-context';
import Message from './Message';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  cvsContext: any;
  token: any;
  user: any;
};
// Loading enum
enum LoadingSearch {
  ON = 'ON',
  OFF = 'OFF',
  STATIC = 'STATIC',
}

export const ChatWrapper: FC = () => {
  // Return
  return (
    <Chat_Side />
  );
};

const Chat_Side: FC = () => {

  // Conversations
  const cvsContext: any = useConversations();
  // user 
  const user: any = useAuth();
  // Config

  const config = useConfig();

  const delay = 300;
  // Search Cvs list
  const [searchCvs, setSearchCvs] = React.useState<any[]>([]);
  const [csvLoading, setCsvLoading] = React.useState<boolean>(true);
  const [currCvsLoading, setCurrCsvLoading] = useState<boolean>(true);
  // Search pop
  const [searchPop, setSearchPop] = React.useState<boolean>(false);


  // Use Effect
  React.useEffect(() => {
    // Load Conversations
    (async () => {
      // Enable loading
      setCsvLoading(true);

      // console.log(user.get?._id);


      // Get conversations
      const res: Response = await fetcher({
        method: 'GET',
        url: '/conversations/page',
        payload: { page: 1, user: user.get?._id },
      });
      // console.log(res?.data);
      // Check response and handle data
      if (res?.status === 200)
        cvsContext.list.set(res?.data);

      //console.log(res?.data);

      // Disable Loading
      setTimeout(() => {
        setCsvLoading(false);
      }, delay);


    })();

    // Return clean
    return () => cvsContext.list.set([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // List conversation length
    const listCvsLength: number = cvsContext.list.get?.length;

    // Loading current conversation
    listCvsLength > 0 &&
      (async () => {
        // Load data from session storage
        const sessionCvs = await AsyncStorage.getItem('tshus.current.conversation'); // Corrected key

        // Parse data
        const parse = sessionCvs ? JSON.parse(sessionCvs) : null;

        // Handle set current cvs
        const setCurrentCvs = cvsContext.current.set;

        

        // Check session has conversation
        if (parse?.user_id === user.get?._id && parse?.cvs) {
          // Set default current conversation
          setCurrentCvs(parse.cvs);
        } else {
          // Set default current conversation
          setCurrentCvs(cvsContext.list.get[0]);
        }

        // Enable loading
        setCurrCsvLoading(true);
      })();

    // Disable Loading
    setTimeout(() => {
      setCurrCsvLoading(false);
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvsContext.list.get]);

  type NavType = {
    navigate: (screen: string, data: any) => void;
  }
  const nav = useNavigation();
  const goToContact = (nav: NavType) => {
    nav.navigate("Contact", null);
  };

  const goToProfile = (nav: NavType) => {
    nav.navigate("Profile", null);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleAddButton = () => {
    setModalVisible(true); // Hiển thị modal khi nhấn vào nút "Thêm"
  };

  const handleAddChat = () => {
    console.log("Thêm đoạn chat");
    setModalVisible(false); // Đóng modal sau khi chọn "Thêm đoạn chat"
  };

  const handleMessage = (nav: NavType, cvs: any) => {
    // Set Cvs
    cvsContext.current.get?._id !== cvs?._id && cvsContext.current.set(cvs);

    nav.navigate("Message", null);
  }

  const handleAddFriends = (nav: NavType) => {
    console.log("Thêm bạn bè");
    nav.navigate("Add_friend", null)
    setModalVisible(false); // Đóng modal sau khi chọn "Thêm bạn bè"
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* - - - - - - - - - - Header - - - - - - - - - - - */}

      <View style={styles.header}>
        <LinearGradient
          colors={["#77caea", "#38A2CF", "#156DBA"]}
          start={[0, 0]}
          end={[1, 2]}
          style={styles.gradienthead}
        >
          <TouchableOpacity>
            <Image
              source={require("../../../../Images/search.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddButton}>
            <Image
              source={require("../../../../Images/plus.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setModalVisible(false)} // Đóng modal khi chạm vào phần trống
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={handleAddChat}
                style={styles.modalButton}
              >
                <Text>Thêm đoạn chat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAddFriends(nav)}
                style={styles.modalButton}
              >
                <Text>Thêm bạn bè</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      {/* - - - - - - - - - - Body - - - - - - - - - - - */}
      <ScrollView style={styles.body} >
        {
          cvsContext?.list.get?.map((item: any, index: number) => {

            const isRooms = item?.type === ConversationEnum.ROOMS;

            const chats = item?.chats?.[0];

            const isInviter = user.get?._id === chats?.inviter?.user;

            const cvsName = isRooms
              ? item?.rooms[0]?.name
              : isInviter
                ? chats?.friend?.nickname
                : chats?.inviter?.nickname;
            return (

              <TouchableOpacity onPress={() => handleMessage(nav, item)}>


                <View style={{ flexDirection: 'row', borderColor: "#B7C2CF", borderBottomWidth: 1, paddingTop: 5 }}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: "https://i.pinimg.com/564x/e6/eb/28/e6eb285f58d7b13a0974014ba87734dc.jpg",
                    }}
                  />

                  <View style={{ paddingLeft: 8, paddingTop: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{cvsName}</Text>
                    <Text style={{ fontSize: 11, paddingTop: 8 }}>
                      {item?.last_message || 'Không có tin nhắn nào'}
                    </Text>
                  </View>

                </View>
              </TouchableOpacity>
            )
          })
        }

      </ScrollView>




      {/* - - - - - - - - - - Footer - - - - - - - - - - - */}

      <View style={styles.footer}>
        <LinearGradient
          colors={["#77caea", "#38A2CF", "#156DBA"]}
          start={[0, 0]}
          end={[1, 2]}
          style={styles.gradient}
        >
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("../../../../Images/chat.png")}
              style={styles.footerIcon}
            />
            <Text style={styles.footerText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => goToContact(nav)}>
            <Image
              source={require("../../../../Images/contact.png")}
              style={styles.footerIcon}
            />
            <Text style={styles.footerText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => goToProfile(nav)}>
            <Image
              source={require("../../../../Images/user.png")}
              style={styles.footerIcon}
            />
            <Text style={styles.footerText}>Profile</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

export default (Chat_Side);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  // - - - - - - - - - - Header - - - - - - - - - -
  header: {
    flex: 1,
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
    position: 'absolute',
    width: "100%",
    paddingTop: 90,
    paddingLeft: 10
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#1890FF",
    width: 60,
    height: 60,
    borderRadius: 80,
    marginBottom: 10,
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