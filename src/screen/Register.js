// import React, { Component } from 'react'
// import { Input, Center, Button, NativeBaseProvider, Avatar } from "native-base"
// import { Text, View } from 'react-native'
// import NavigationBar from '../component/NavigationBar';
// import Header from '../component/CustomHeader'
// import PreventBackButtonNav from '../component/PreventBackButtonNav'

// export class Register extends Component {

//     constructor(props) {
//         super(props);
//         this.state = ({
//             show: false
//         })
//     }

//     handleClick() {
//         this.setState({
//             show: !this.state.show
//         })
//     }

//     render() {
//         return (
//             <NativeBaseProvider style={{ flex: 1 }}>
//                 <PreventBackButtonNav />
//                 <Header title="Đăng ký" navigation={this.props.navigation} />

//                 <Center flex={1}>
//                     <View style={{ marginBottom: 30, marginTop: -80 }}>
//                         <Avatar
//                             size="2xl"
//                             source={require('./../media/bonsai_2.png')}
//                         >
//                         </Avatar>
//                     </View>
//                     <Input
//                         w="80%"
//                         type="number"
//                         placeholder="Nhập số điện thoại"
//                         keyboardType={'numeric'}
//                     />


//                     <View style={{ marginTop: 10 }}>
//                         <Button colorScheme="orange" ><Text style={{ color: 'white', fontWeight: "900", fontSize: 15, paddingHorizontal: 110 }}>Tiếp tục</Text></Button>
//                         <Text style={{ justifyContent: "center", textAlign: 'center', marginTop: 20 }}>Đã có tài khoản? Đăng nhập ngay!</Text>
//                         <View style={{ marginVertical: 20 }}>
//                             <Button colorScheme="blue" ><Text style={{ color: 'white', fontWeight: "900", fontSize: 15 }}>Đăng nhập</Text></Button>
//                         </View>

//                     </View>

//                 </Center>
//                 <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
//                     <NavigationBar navigation={this.props.navigation} />
//                 </View>
//             </NativeBaseProvider >
//         )
//     }
// }

// export default Register

import * as React from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform,ToastAndroid } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import { Input, Center, NativeBaseProvider, Avatar } from "native-base"
import NavigationBar from '../component/NavigationBar';
import Header from '../component/CustomHeader'
import PreventBackButtonNav from '../component/PreventBackButtonNav'

// Initialize Firebase JS SDK
// https://firebase.google.com/docs/web/setup
try {
  var firebaseConfig = {
    apiKey: "AIzaSyA-xcoCor0ZIbk8CLVMAB0ZUGi9PXPe-E4",
    authDomain: "reactnativebonsaishop-880f6.firebaseapp.com",
    databaseURL: "https://reactnativebonsaishop-880f6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "reactnativebonsaishop-880f6",
    storageBucket: "reactnativebonsaishop-880f6.appspot.com",
    messagingSenderId: "440084484438",
    appId: "1:440084484438:web:244b826b3cc770a9bf06f7"

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // ignore app already initialized error in snack
}

export default function Register(props) {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device." }
    : undefined);

  return (
    <NativeBaseProvider style={{ flex: 1 }}>
      <PreventBackButtonNav />
      <Header title="Đăng ký" navigation={props.navigation} />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Center flex={1}>

        <View style={{ marginBottom: 30, marginTop: -150 }}>
          <Avatar
            size="2xl"
            source={require('./../media/bonsai_2.png')}
          >
          </Avatar>
        </View>

        <Text style={{ marginTop: 20, marginLeft: -100 }}>Nhập số điện thoại : </Text>
        <TextInput
          style={{ marginVertical: 10, fontSize: 17, borderColor: "#898a8c", borderWidth: 1.5, borderRadius: 5, width: "60%", height: 45 }}
          placeholder=" 0943888999"
          autoFocus
          keyboardType="numeric"
          onChangeText={(phoneNumber) => setPhoneNumber("+84" + phoneNumber)}
        />

        <Button
          style={{ marginVertical: 10, fontSize: 17, borderColor: "#898a8c", borderWidth: 1.5, borderRadius: 5, width: "60%", height: 45 }}
          title="Nhận Mã OTP"
          disabled={!phoneNumber}
          onPress={async () => {
            // The FirebaseRecaptchaVerifierModal ref implements the
            // FirebaseAuthApplicationVerifier interface and can be
            // passed directly to `verifyPhoneNumber`.
            try {
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId);
                ToastAndroid.show(`Mã OTP đã được gửi đi`, ToastAndroid.LONG);
            } catch (err) {
              alert(`LỖI : ${err.message}`);
            }
          }}
        />



        <Text style={{ marginTop: 20, marginLeft: -130 }}>Nhập mã OTP:</Text>
        <TextInput
          keyboardType="numeric"
          style={{ marginVertical: 10, fontSize: 17, borderColor: "#898a8c", borderWidth: 1.5, borderRadius: 5, width: "60%", height: 45 }}
          editable={!!verificationId}
          placeholder=" Mã OTP 6 chữ số "
          onChangeText={setVerificationCode}
        />

        <Button
          title="Xác nhận "
          disabled={!verificationId}
          onPress={async () => {
            try {
              const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              await firebase.auth().signInWithCredential(credential);
              props.navigation.navigate('CreatePassword', { phone: phoneNumber });
            } catch (err) {
              alert(`Error: ${err.message}`);
            }
          }}
        />
        {message ? (
          <TouchableOpacity
            style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
            onPress={() => showMessage(undefined)}>
            <Text style={{ color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
              {message.text}
            </Text>
          </TouchableOpacity>
        ) : undefined}

      </Center>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
        <NavigationBar navigation={props.navigation} />
      </View>
    </NativeBaseProvider >
  );
}

