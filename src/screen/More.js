import React, { Component } from 'react'
import { Text, View ,BackHandler, Alert} from 'react-native'
import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'

export class More extends Component {
    
    render() {
        
        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Text> textInComponent More </Text>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}

export default More

