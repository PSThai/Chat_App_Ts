import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { fetcher } from 'common/utils/fetcher';
import { Response } from 'common/types/res/response.type';

const Register = () => {
  const nav = useNavigation();


  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setemail] = useState("");
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
    
    const res: Response = await fetcher({
      method: 'POST',
      url: '/auth/register',
      payload: payload
    })
    console.log(res?.message);
    if (res?.status === 200) {
      Alert.alert(
        "Dang ky thanh cong",
        "Dang ky thanh cong vui long dang nhap!"
      );

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
          value={firstname}
          onChangeText={(text) => setfirstname(text)}
          placeholder="First name"
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
          value={lastname}
          onChangeText={(text) => setlastname(text)}
          placeholder="last name"
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