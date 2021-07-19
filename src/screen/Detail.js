import React, { Component } from 'react'
import { Text, View } from 'react-native'

 class Detail extends Component {
    render() {
        return (
            <View>
                <Text>itemId: {this.props.route.params.itemId}</Text>
            </View>
        )
    }
}

export default Detail
