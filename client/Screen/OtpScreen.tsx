import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import authServices from "../context/auth/services"
import { useNavigation } from '@react-navigation/native';

type NavType = {
    navigate: (screen: string, email: any) => void;
}
const OtpScreen = () => {
    
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false); // State để kiểm soát việc hiển thị của OtpInput
    // Assuming `nav` is of type NavType
    const goRegister = (nav: NavType) => {
        nav.navigate("Register", { email });
    }

    const nav = useNavigation();

    const handleSendOTP = async () => {
        console.log(email);

        // Xử lý logic gửi OTP ở đây
        const result = await authServices.sendOtp({ email });
        // Sau khi gửi OTP, hiện OtpInput để nhập mã OTP
        if (result) {
            setShowOtpInput(true);
        } else {
            console.error('Send OTP failed');
        }
    };

    const handleverifyOTP = async () => {
        console.log(email);
        console.log(otp);


        // Xử lý logic đăng nhập ở đây
        const isOTPValid = await authServices.verifyOTP({ email, otp });

        // setShowOtpInput(false);
        if (isOTPValid) {
            setShowOtpInput(false);
            goRegister(nav)

        } else {
            console.error('Invalid OTP');
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '80%' }}>
                    <TextInput
                        style={{ backgroundColor: '#ced4da', height: 50 }}
                        placeholder="Nhập email..."
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleSendOTP}
                    style={{
                        backgroundColor: '#3399FF',
                        marginTop: 20,
                        height: 50,
                        width: 80,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 15 }}>Nhận OTP</Text>
                </TouchableOpacity>
            </View>
            {showOtpInput && ( // Hiển thị OtpInput nếu showOtpInput là true
                <View
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                    <View
                        style={{
                            marginVertical: 22,
                            width: '80%'
                        }}>
                        <OtpInput
                            numberOfDigits={6}
                            onTextChange={(text) => setOtp(text)} />
                    </View>


                    <View style={styles.textfooter}>
                        <Text style={{}}>Không nhận được mã !</Text>
                        <TouchableOpacity style={{}}>
                            <Text style={{ color: '#3399FF' }}>Gửi lại</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.loginbtn} onPress={handleverifyOTP}>
                            <Text style={styles.btntext}>Xác Nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            )}

        </View>
    );
};

export default OtpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginbtn: {
        width: 250,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#1890FF',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        marginTop: 100
    },
    textfooter: {
        marginTop: 10,
        flexDirection: 'row'
    },
    btntext: {
        fontSize: 23,
        color: 'white',
        fontWeight: 'bold'
    }
});
