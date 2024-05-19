import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useConfig } from 'common/hooks/use-config';
import { ThemeEnum } from 'common/enum/theme.enum';
import { useAuth } from 'client/hooks/use-auth';
import { useConversations } from 'client/hooks/user-conversations';
import { Conversations } from 'common/interface/Conversations';
import { theme } from 'antd';
import { MessageType } from 'common/enum/message-type';
import { AWS_URL, BASE_URL, fetcher } from "common/utils/fetcher";

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

// // Download file
// const download = (file: any) => {
//     fetch(`${AWS_URL}/${file.filename}`)
//         .then((response) => response.blob())
//         .then((blob) => {
//             const url = URL.createObjectURL(new Blob([blob]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.download = file.originalname;
//             document.body.appendChild(link);
//             link.click();
//             URL.revokeObjectURL(url);
//             link.remove();
//         });
// };

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
                        style={{ alignSelf: `${justify}`, fontSize: 12.5, marginRight: 12 }}

                    >
                        {data?.sender?.nickname}
                    </Text>

                    <View style={{ alignSelf: `${justify}` }}>
                        {data?.type === MessageType.TEXT ? (
                            <MessageTextLine
                                token={token}
                                isSender={isSender}
                                msg={data?.messages}
                            />
                        ) : (
                            <MessageFileLine
                                token={token}
                                isSender={isSender}
                                files={data?.files}
                            />
                        )}


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
                marginRight: 12
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

const MessageFileLine: React.FC<FileMessage> = ({
    token,
    files,
    isSender,
    msg,
}: FileMessage) => {

    const config: any = useConfig();

    // light theme
    const isLight: boolean = config?.theme === ThemeEnum.LIGHT;

    // Color text
    const color: string = isSender ? 'white' : 'rgb(97, 97, 97)';

    return (
        <View>
            {files?.map((file: any, index: number) =>
                !file.mimetype.startsWith('image') ? (
                    <View key={index} style={{ display: 'flex', justifyContent: isSender ? "flex-end" : "flex-start" }}>
                        <Text style={{ color: color, fontSize: 14 }}>
                            {file.originalname}
                        </Text>
                        <Text style={{ color: color, fontSize: 9 }}>{file.size}</Text>
                    </View>
                ) : (
                    <View key={index} style={{}}>
                        <Image
                            style={styles.image}
                            source={{ uri: `${AWS_URL}/${file.filename}` }}
                            onError={() => console.log('Error loading image')}
                        />
                    </View>
                ),
            )}
            {msg?.trim() !== '' && (
                <View style={{ padding: 5 }}>
                    <MessageTextLine token={token} isSender={isSender} msg={msg} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    nickname: {
        fontSize: 12.5,
        marginRight: 12
    },
    messageTextLine: {
        height: 40,
        borderRadius: 5,
        padding: 8,
        position: "relative",
        marginRight: 12
    },
    senderText: {
        color: 'white'
    },
    receiverText: {
        color: 'rgb(97, 97, 97)'
    },
    image: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
        borderRadius: 5
    }
});
export default Chat_Line