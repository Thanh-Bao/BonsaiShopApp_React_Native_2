import React, { Component } from 'react'
import { Text, View, BackHandler, Alert } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import Header from '../component/CustomHeader'

import PreventBackButtonNav from '../component/PreventBackButtonNav'

class Account extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title="Quản lý tài khoản" navigation={this.props.navigation} />
                <Text> Account </Text>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}
export default Account;
