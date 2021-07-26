import React, { Component } from 'react'
import { Text, View, BackHandler, Alert, ToastAndroid } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Button, Center, NativeBaseProvider } from "native-base"
import CallAPI from '../component/callAPIMainServer'

export class CreatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            newPhone: this.props.route.params.phone,
            show: false,
            password: "Admin123@#"
        })
    }
    handleClick() {
        this.setState({
            show: !this.state.show
        })
    }


    handleSubmit() {
        const user = {
            phone: this.state.newPhone,
            password: this.state.password
        }
        CallAPI(null, 'Users/register', 'POST', null, user).then(res => {
            alert('Đăng kí tài khoản thành công, mời bạn đăng nhập');
            this.props.navigation.navigate('Login');
            this.showToast()
        }).catch(res => {
            alert('Xác thực thất bại, lỗi hệ thống');
        });

    }

    showToast = () => {
        ToastAndroid.show(`Tạo tài khoản thành công`, ToastAndroid.LONG);
    };

    render() {
        return (
            <NativeBaseProvider style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title="Menu" navigation={this.props.navigation} />
                <Center flex={1}>
                    <Text style={{ fontSize: 20, fontWeight: "900", marginBottom: 20 }}> Chào mừng  {this.state.newPhone} </Text>
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
                            placeholder="Vui lòng tạo mật khẩu"
                        />
                        <View style={{ marginTop: 30 }}>
                            <Button
                                onPress={() => this.handleSubmit()}
                                colorScheme="blue" ><Text style={{ color: 'white', fontWeight: "900", fontSize: 15, paddingHorizontal: 110 }}>Xác nhận</Text></Button>
                        </View>
                    </View>

                </Center>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </NativeBaseProvider>
        )
    }
}

export default CreatePassword
