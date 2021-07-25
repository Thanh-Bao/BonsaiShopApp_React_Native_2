import React, { Component } from 'react'
import { Input, Center, Button, NativeBaseProvider, Avatar } from "native-base"
import { Text, View, ToastAndroid } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import Header from '../component/CustomHeader'
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import CallAPI from '../component/callAPIMainServer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchScreen } from '../store/action/SwitchScreen'
import { updateCartCounter } from '../store/action/countCartItem'
import { storeToken } from '../store/action/storeToken'
import { addUserPhoneLogin } from '../store/action/addUserPhoneLogin'


export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            show: false,
            userPhone: null,
            password: null
        })
    }

    handleClick() {
        this.setState({
            show: !this.state.show
        })
    }

    storeUserInfo = async (phone, name, token) => {
        await AsyncStorage.setItem("USER_PHONE", `${phone}`)
        await AsyncStorage.setItem("USER_NAME", `${name}`)
        await AsyncStorage.setItem("TOKEN", `${token}`)
    }

    showToast = () => {
        ToastAndroid.show(`Đăng nhập thành công`, ToastAndroid.LONG);
    };


    // getUser = async () => {
    //     const value1 = await AsyncStorage.getItem("USER_PHONE")
    //     const value2 = await AsyncStorage.getItem("USER_NAME")
    //     if (value1 != null && value2!=1) {
    //         console.log(value1 + "_____" + value2)
    //     }
    // }

    handleLogin() {
        const { userPhone, password } = this.state
        if (userPhone == null || userPhone === '' || password == null || password == '') {
            alert("Vui lòng nhập đầy đủ số điện thoại và mật khẩu!")
        } else {
            let body = {
                phone: this.state.userPhone,
                password: this.state.password,
            }
            CallAPI("", 'Users/login', 'POST', null, body).then(res => {
                const { phone, name, token } = res.data
                // localStorage.setItem("token", res.data.token);
                // if (res.data.name === " ") {
                //     // localStorage.setItem("customerName", res.data.phone);
                //     // this.props.dispatch({ type: "UPDATE_CUSTOMER_WELCOME", data: res.data.phone });
                // } else {
                //     // localStorage.setItem("customerName", res.data.name);
                //     // this.props.dispatch({ type: "UPDATE_CUSTOMER_WELCOME", data: res.data.name });
                // }
                // localStorage.setItem("PHONEUSERLOGINED", res.data.phone);
                // this.props.history.push('/home')
                this.props.storeToken(token)
                this.props.addUserPhoneLogin(phone)
                this.storeUserInfo(phone, name, token)
                this.showToast()
                this.props.navigation.navigate('Home')

            }).catch(
                err => {
                    console.log(err)
                    alert("Đăng nhập thất bại, vui lòng kiểm  tra lại")
                }
            )
        }

    }

    render() {
        return (
            <NativeBaseProvider style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title="Đăng nhập" navigation={this.props.navigation} />

                <Center flex={1}>
                    <View style={{ marginBottom: 30, marginTop: -80 }}>
                        <Avatar
                            size="2xl"
                            source={require('./../media/bonsai_icon.png')}
                        >
                        </Avatar>
                    </View>
                    <Input
                        onChangeText={e => this.setState({
                            userPhone: e
                        })}
                        w="80%"
                        type="number"
                        placeholder="Số điện thoại"
                        keyboardType={'numeric'}
                    />

                    <View style={{ marginTop: 10 }}>
                        <Input
                            onChangeText={e => this.setState({
                                password: e
                            })}
                            w="80%"
                            type={this.state.show ? "text" : "password"}
                            InputRightElement={
                                <Button onPress={() => { this.handleClick() }}>
                                    {this.state.show ? "ẩn" : "hiện"}
                                </Button>
                            }
                            placeholder="Mật khẩu"
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Button
                            onPress={() => this.handleLogin()}
                            colorScheme="blue" ><Text style={{ color: 'white', fontWeight: "900", fontSize: 15, paddingHorizontal: 110 }}>Đăng nhập</Text></Button>
                        <Text style={{ justifyContent: "center", textAlign: 'center', marginTop: 20 }}>Hoặc đăng kí nếu chưa có tài khoản</Text>
                        <View style={{ marginVertical: 20 }}>
                            <Button colorScheme="orange"
                                onPress={() => { this.props.navigation.navigate('Register') }}
                            ><Text style={{ color: 'white', fontWeight: "900", fontSize: 15 }}>Đăng ký</Text></Button>
                        </View>

                    </View>

                </Center>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </NativeBaseProvider >
        )
    }
}

const mapStateToProps = (state) => {
    const { rootReducer } = state
    return { rootReducer }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addUserPhoneLogin,
        storeToken
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Login);
