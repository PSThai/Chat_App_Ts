// import { StyleSheet, Text, View } from 'react-native'
// import { FC, useEffect, useState } from 'react'
// import ConversationsProvider from 'client/context/conversations-context';
// import { Messages } from 'common/interface/Messages';
// import Chat_Side from './component/Chat_Side';

// import { theme } from 'antd';
// import { useConversations } from 'client/hooks/user-conversations';
// import { useAuth } from 'client/hooks/use-auth';

// const ChatWrapper: FC = () => {
//     return (
//         <ConversationsProvider>
//             <Chat />
//         </ConversationsProvider>
//     );
// };
// // Use Token
// const { useToken } = theme;

// const Chat: FC = () => {

//     // Conversations
//     const cvsContext: any = useConversations();

//     // User
//     const user: any = useAuth();

//     const [messages, setMessages] = useState<Messages[]>([]);
//     const { token } = useToken();
//     // useEffect(() => {
//     //     // Clean up messages when component unmounts
//     //     return () => {
//     //         setMessages([]);
//     //     };
//     // }, [])

//     return (
//             <View>
//                 <Chat_Side/>
//             </View>

//     )

// }
// export default ChatWrapper

// const styles = StyleSheet.create({})