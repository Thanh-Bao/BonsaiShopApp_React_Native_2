import React, { Component } from 'react'
import { Text, View } from 'react-native'
import NavigationBar from '../component/NavigationBar';

class Account extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text> Account </Text>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}
export default Account;
