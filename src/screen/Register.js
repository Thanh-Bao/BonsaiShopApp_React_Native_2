import React, { Component } from 'react'
import { Input, Center, Button, NativeBaseProvider, Avatar } from "native-base"
import { Text, View } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import Header from '../component/CustomHeader'
import PreventBackButtonNav from '../component/PreventBackButtonNav'

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            show: false
        })
    }

    handleClick() {
        this.setState({
            show: !this.state.show
        })
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
                            RB
                        </Avatar>
                    </View>
                    <Input
                        w="80%"
                        type="number"
                        placeholder="Số điện thoại"
                        keyboardType={'numeric'}
                    />

                    <View style={{ marginTop: 10 }}>
                        <Input
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
                        <Button colorScheme="blue" ><Text style={{ color: 'white', fontWeight: "900", fontSize: 15, paddingHorizontal: 110 }}>Đăng nhập</Text></Button>
                        <Text style={{ justifyContent: "center", textAlign: 'center', marginTop: 20 }}>Hoặc đăng kí nếu chưa có tài khoản</Text>
                        <View style={{ marginVertical: 20 }}>
                            <Button colorScheme="orange" ><Text style={{ color: 'white', fontWeight: "900", fontSize: 15 }}>Đăng ký</Text></Button>
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

export default Register
