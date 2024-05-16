import { Radio, Space } from "antd-mobile";
import { useAuth } from "client/hooks/use-auth";
import React, { useState } from "react";
import {
    Modal,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    Text,
    TextInput,
} from "react-native";
import RadioButtonsGroup, { RadioGroup } from "react-native-radio-buttons-group";

interface EditProfileModalProps {
    visible: boolean;
    onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onClose }) => {
    const user = useAuth();
  
    const [nickname, setFirtname] = useState("");
    const [phone, setphone] = useState("");
    const [gender, setgender] = useState("");

    const handleSelectOption = (option: any) => {
        setgender(option);
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <Text style={{fontSize:21, fontWeight:"bold", marginBottom:30}}>Cập Nhật Thông Tin</Text>

                    <TextInput style={styles.inputText}>{user?.get.nickname}</TextInput>

                    <TextInput style={styles.inputText}> {user?.get.phone}</TextInput>
                    <View style={{flexDirection:"row",}}>
                        <TouchableOpacity style={styles.genderItem} onPress={() => handleSelectOption('MALE')}>
                            <Text>{gender === 'MALE' ? '◉' : '◯'}</Text>
                            <Text style={{fontSize:17, marginLeft:5}}>Nam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.genderItem} onPress={() => handleSelectOption('FEMALE')}>
                            <Text>{gender === 'FEMALE' ? '◉' : '◯'}</Text>
                            <Text style={{fontSize:17, marginLeft:5}}>Nữ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.genderItem} onPress={() => handleSelectOption('OTHER')}>
                            <Text>{gender === 'OTHER' ? '◉' : '◯'}</Text>
                            <Text style={{fontSize:17, marginLeft:5}}>Khác</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.modalItem} onPress={onClose}>
                        <Text style={{color:"white", fontWeight:"bold"}}>Lưu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalItem} onPress={onClose}>
                        <Text style={{color:"white", fontWeight:"bold"}}>Đóng</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",

    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 2,
        alignItems: "center",
        width: "90%",
        height: "60%",
        justifyContent:"center"
    },
    modalItem: {
        margin: 10,
        padding:10,
        backgroundColor:"#38A2CF",
        borderRadius:10,
        width:250,
        alignItems:"center",
        alignContent:"center"
    },
    inputText: {
        padding:10,
        borderRadius:5,
        backgroundColor:"#ced4da",
        margin:10,
        width:250
    },
    genderItem:{
        margin:15,
        justifyContent:"center",
        alignContent:"space-around",
        alignItems:"center",
        flexDirection:"row"
    }
});

export default EditProfileModal;
