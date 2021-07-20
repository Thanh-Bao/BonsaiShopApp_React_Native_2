import React, { Component } from 'react'
import { Text, View } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import Header from '../component/CustomHeader'
import PreventBackButtonNav from '../component/PreventBackButtonNav'

export class Search extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title="Tìm kiếm và lọc sản phẩm" navigation={this.props.navigation} />
                <Text> textInComponent  Search </Text>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}

export default Search
