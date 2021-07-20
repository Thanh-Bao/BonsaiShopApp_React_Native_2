import React, { Component } from 'react'
import { Text, View,BackHandler, Alert } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'

class Detail extends Component {
   
    render() {
        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title="Chi tiết sản phẩm" navigation={this.props.navigation} />
                <Text>itemId: {this.props.route.params.itemId}</Text>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}

export default Detail
