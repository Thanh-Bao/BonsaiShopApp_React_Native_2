import React, { Component } from 'react'
import { Text, View, BackHandler, Alert, TouchableOpacity, Linking } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Center, Box, NativeBaseProvider, Button } from "native-base"
import { ListItem, Icon } from 'react-native-elements'

export class Purchase extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            orderID: this.props.route.params.orderID
        })
    }

    render() {
        return (
            <NativeBaseProvider >
                <PreventBackButtonNav />
                <Header title="Menu" navigation={this.props.navigation} />
                <Center >

                    <Text>OrderID = {this.state.orderID}</Text>

                </Center>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </NativeBaseProvider>
        )
    }
}

export default Purchase

