import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ConversationsProvider from 'client/context/conversations-context'
import { Messages } from 'common/interface/Messages'
import { useConversations } from 'client/hooks/user-conversations'
import { useAuth } from 'client/hooks/use-auth'


const chat_content = () => {
    return (
        <ConversationsProvider>
            <Chat />
        </ConversationsProvider>
    )
}

const Chat = () => {
    // Message State
    const [message, setMessage] = useState<string>('');

    // Chat messages
    const [messages, setMessages] = useState<Messages[]>([]);
    // Conversations
    const cvsContext: any = useConversations();
    const [currCvsLoading, setCurrCsvLoading] = useState<boolean>(true);

    // Handle Set Message
    const handleSetMessage: any = (value: string) => setMessage(value);
    // User
    const user: any = useAuth();

    return (

        <View />
    );
}

export default chat_content

const styles = StyleSheet.create({})