import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useAuth } from '../hooks/use-auth';
// import authService from '../context/auth/services';
import { fetcher } from 'common/utils/fetcher';
import { Response } from 'common/types/res/response.type';
import { getCookie, setCookie } from '../../common/utils/cookie';
import { useAuth } from 'client/hooks/use-auth';
import authServices from 'client/context/auth/services'
import { login } from 'client/context/auth/reducers';
// import { login } from '../context/auth/reducers';

const Login = () => {

    const nav = useNavigation();
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");

    // User uath
    const auth: any = useAuth();
    const [loading, setLoading] = useState<Boolean>(false);

    type NavType = {
        navigate: (screen: string) => void;
    }

    const goToChat = async (nav: NavType) => {

        // Result
        const loged = await authServices.login({
            email: email,
            password: password,
        });

        setLoading(true);
        // Save data
        if (loged?.user) {
            // Set data
            auth.set(login({ ...loged?.user, isAuthenticated: true }));
            nav.navigate("Chat")
        } else {
            console.log("login fail");
            
        }

        // // Response
        // const res: Response = await fetcher({
        //     method: 'POST',
        //     url: '/auth/login',
        //     payload: {
        //         email: email,
        //         password: password
        //     }
        // });
        // if (res?.status === 200) {


        //     // console.log(res?.data);

        //     const token = res?.data?.token;

        //     // Save token
        //     setCookie('token', token.accessToken, token?.expiration).then(() => {
        //         console.log("Cookie 'token' has been set successfully");
        //     }).catch(error => {
        //         console.error("Error setting 'user' cookie:", error);
        //     });

        //     // Save user
        //     setCookie('user', res?.data?.user, token?.expiration).then(() => {
        //         console.log("Cookie 'user' has been set successfully");
        //     }).catch(error => {
        //         console.error("Error setting 'user' cookie:", error);
        //     });

        //     nav.navigate("Chat")
        // }
        // Alert.alert(
        //     "Login Sucess",
        //     "Login sucessfull!"
        // );

    }



    // Assuming `nav` is of type NavType
    const goRegister = (nav: NavType) => {
        nav.navigate("Register");
    }

    return (
        <View style={{
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Image style={{ height: "100%", width: "100%", position: 'absolute' }} source={require('../../assets/background.png')} />
            <View style={{
                height: "100%",
                width: "100%",
                flex: 2,
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 70
            }}>
                <View style={{ flex: 1, paddingTop: 170 }}>
                    <Text style={{
                        color: "#FFF",
                        fontWeight: 'bold',
                        fontSize: 55,
                    }}>ZOHE</Text>
                </View>


                <TextInput
                    style={{
                        width: "85%",
                        height: 55,
                        backgroundColor: "#ced4da",
                        borderRadius: 10,
                        margin: 13,
                        justifyContent: "center",
                        padding: 20,
                        marginBottom: 15
                    }}
                    value={email}
                    onChangeText={(text) => setemail(text)}
                    placeholder="Email"
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={{
                        width: "85%",
                        height: 55,
                        backgroundColor: "#ced4da",
                        borderRadius: 10,
                        margin: 13,
                        justifyContent: "center",
                        padding: 20,
                        marginBottom: 15
                    }}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    placeholder="Mật khẩu"
                    placeholderTextColor="gray"

                />
                <TouchableOpacity style={{ paddingLeft: 260, paddingBottom: 30 }}>
                    <Text style={{ fontStyle: "italic", fontSize: 12 }}>
                        Quên mật khẩu ?
                    </Text>

                    <View style={{ borderWidth: 0.6, borderColor: "black" }}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => goToChat(nav)} style={{
                    width: '50%',
                    height: 55,
                    borderRadius: 20,
                    overflow: 'hidden', // Ensure the gradient is contained within the button's border radius
                    marginTop: 30,
                }}>
                    <LinearGradient
                        colors={['#38A2CF', '#156DBA']}
                        start={[0, 0]}
                        end={[1, 2]}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 16,
                        }}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 30,
                }}>
                    <Text style={{}}>Bạn chưa có tài khoản ? </Text>
                    <TouchableOpacity style={{}} onPress={() => goRegister(nav)}>
                        <Text style={{ color: "#3399FF" }}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({

})