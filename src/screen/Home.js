import React, { Component } from 'react'
import { Text, View, Button } from 'react-native';
import Card from '../component/Card'


class Home extends Component {
    render() {
        return (
            <View>
                <Card navigation={this.props.navigation} title="huhu1" itemIId={999} />
                <Card navigation={this.props.navigation} title="huhu2" itemIId={123} />
            </View>)
    }
}
export default Home;