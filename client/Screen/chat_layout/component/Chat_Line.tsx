import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useConfig } from 'common/hooks/use-config';
import { ThemeEnum } from 'common/enum/theme.enum';
import { useAuth } from 'client/hooks/use-auth';

import { useConversations } from 'client/hooks/user-conversations';
import { Conversations } from 'common/interface/Conversations';
import { Col, Row, theme } from 'antd';
import { MessageType } from 'common/enum/message-type';


type Props = { data: any };

type FileMessage = {
    files: any;
    msg?: string;
    token: any;
    isSender: boolean;
};

type TextMessage = {
    msg: string;
    token: any;
    isSender: boolean;
};

const { useToken } = theme;
const Chat_Line = ({ data }: Props) => {

    const { token } = useToken();
    // User
    const user: any = useAuth();

    const isSender = user.get?._id === data?.sender?.user;

    const cvsContext = useConversations();

    const [tranfModelOpen, setTranfModelOpen] = useState(false);

    // Set tranf conversation id
    const [tranfCvs, setTransfCvs] = useState<Conversations | null>(null);

    const showModal = () => setTranfModelOpen(true);


    // Config
    const config = useConfig();
    // Handle transfer conversation
    const handleTranfCvs = (transf: Conversations) => setTransfCvs(transf);

    const justify = isSender ? 'flex-end' : 'flex-start';

    return (
        <View >
            <View style={{ alignSelf: `${justify}` }}>
                <View >
                    <Text
                        style={{ alignSelf: `${justify}`,fontSize: 12.5 , marginRight:12}}

                    >
                        {data?.sender?.nickname}
                    </Text>
                    <View style={{ alignSelf: `${justify}` }}>
                        {data?.type === MessageType.TEXT}
                        <MessageTextLine
                            token={token}
                            isSender={isSender}
                            msg={data?.messages}
                        />

                    </View>
                </View>
            </View>
        </View>
    )
}
const MessageTextLine: React.FC<any> = ({
    isSender,
    token,
    msg,
}: TextMessage) => {
    // Config

    const config: any = useConfig();

    // ligght theme
    const isLight: boolean = config?.theme === ThemeEnum.LIGHT;

    const colors: string = isSender
        ? token.colorPrimary
        : isLight
            ? '#999'
            : '#fff';

    // Return
    return (
        <View
            style={{
                height: 40,
                borderRadius: 5, padding: 8,
                position: "relative",
                backgroundColor: `${colors}`,
                marginRight:12
            }}
        >
            {
                isSender ? (
                    <Text
                        style={
                            {
                                color: `${token.colorWhite}`
                            }
                        }
                    >
                        {msg}
                    </Text >
                ) : (
                    <Text
                        style={{
                            color: `${isLight ? '#000' : 'rgb(97, 97, 97)'} `
                        }}
                    >
                        {msg}
                    </Text>
                )
            }
        </View >
    );
};

export default Chat_Line

const styles = StyleSheet.create({

})