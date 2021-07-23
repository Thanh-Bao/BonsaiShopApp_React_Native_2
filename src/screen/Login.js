import React, { Component } from 'react'
import { Input, Center, Button, NativeBaseProvider } from "native-base"
import { Text, View } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import Header from '../component/CustomHeader'
import PreventBackButtonNav from '../component/PreventBackButtonNav'

export class Login extends Component {

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
                        <Button colorScheme="blue" >Đăng nhập</Button>
                        <Button colorScheme="blue" >Đăng ký</Button>
                    </View>

                </Center>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </NativeBaseProvider >
        )
    }
}

export default Login
