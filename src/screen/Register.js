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
                <Header title="Đăng ký" navigation={this.props.navigation} />

                <Center flex={1}>
                    <View style={{ marginBottom: 30, marginTop: -80 }}>
                        <Avatar
                            size="2xl"
                            source={require('./../media/bonsai_2.png')}
                        >
                        </Avatar>
                    </View>
                    <Input
                        w="80%"
                        type="number"
                        placeholder="Nhập số điện thoại"
                        keyboardType={'numeric'}
                    />


                    <View style={{ marginTop: 10 }}>
                        <Button colorScheme="orange" ><Text style={{ color: 'white', fontWeight: "900", fontSize: 15, paddingHorizontal: 110 }}>Tiếp tục</Text></Button>
                        <Text style={{ justifyContent: "center", textAlign: 'center', marginTop: 20 }}>Đã có tài khoản? Đăng nhập ngay!</Text>
                        <View style={{ marginVertical: 20 }}>
                            <Button colorScheme="blue" ><Text style={{ color: 'white', fontWeight: "900", fontSize: 15 }}>Đăng nhập</Text></Button>
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
