import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { fetcher } from 'common/utils/fetcher';
import { Response } from 'common/types/res/response.type';
import authServices from "../context/auth/services"

type RootStackParamList = {
  OtpScreen: { email: string }; // Xác định kiểu dữ liệu của 'email' là string
  // Các màn hình khác...
};

type OtpScreenRouteProp = RouteProp<RootStackParamList, 'OtpScreen'>;

interface OtpScreenProps {
  route: OtpScreenRouteProp;
}
const Register: React.FC<OtpScreenProps> = ({ route }) => {

  const nav = useNavigation();
  const email = route.params?.email;
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const HandleRegister = async () => {

    const payload = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      password: password,
      retypePassword: retypePassword
    }
    const result = await authServices.register(payload);

    if (result) {
      Alert.alert(
        "Dang ky thanh cong",
        "Dang ky thanh cong vui long dang nhap!"
      );
      goToChat(nav)
    }
  }

  type NavType = {
    navigate: (screen: string) => void;
  }

  const goToChat = async (nav: NavType) => {
    nav.navigate("Login")
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
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 55,
          }}>Đăng Ký</Text>

        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={{
              width: "40%",
              height: 55,
              backgroundColor: "#ced4da",
              borderRadius: 10,
              margin: 13,
              justifyContent: "center",
              padding: 20,
              marginBottom: 15
            }}
            value={firstname}
            onChangeText={(text) => setfirstname(text)}
            placeholder="First name"
            placeholderTextColor="gray"
          />
          <TextInput
            style={{
              width: "40%",
              height: 55,
              backgroundColor: "#ced4da",
              borderRadius: 10,
              margin: 13,
              justifyContent: "center",
              padding: 20,
              marginBottom: 15
            }}
            value={lastname}
            onChangeText={(text) => setlastname(text)}
            placeholder="last name"
            placeholderTextColor="gray"
          />
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
          placeholder="Email"
          placeholderTextColor="gray"
          editable={false}
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
          value={phone}
          onChangeText={(text) => setPhone(text)}
          placeholder="Phone"
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
          placeholder="Mật khẩu"
          placeholderTextColor="gray"
          secureTextEntry
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
          value={retypePassword}
          onChangeText={(text) => setRetypePassword(text)}
          placeholder="Nhập lại mựt khẩu"
          placeholderTextColor="gray"
          secureTextEntry
        />
        <TouchableOpacity
          onPress={(HandleRegister)}
          style={{
            width: "65%",
            height: 55,
            borderRadius: 20,
            backgroundColor: "#1890FF",
            alignItems: "center",
            justifyContent: "center",
            margin: 15,
          }}
        >
          <Text style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          }}>Đăng Ký</Text>
        </TouchableOpacity>
        <View style={{
          marginTop: 10,
          flexDirection: 'row',
        }}>
          <Text style={{}}>Bạn đã có tài khoản ? </Text>
          <TouchableOpacity onPress={() => (goToChat(nav))}>
            <Text style={{ color: "#3399FF" }}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

export default Register

const styles = StyleSheet.create({})