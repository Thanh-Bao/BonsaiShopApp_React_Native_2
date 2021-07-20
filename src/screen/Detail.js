import React, { Component } from 'react'
import { Text, View } from 'react-native'
import NavigationBar from '../component/NavigationBar';

 class Detail extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>itemId: {this.props.route.params.itemId}</Text>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}

export default Detail
