import React, { Component } from 'react'
import { Text, View, BackHandler, Alert, TouchableOpacity, Linking } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Center, Box, NativeBaseProvider, Button } from "native-base"
import { ListItem, Icon } from 'react-native-elements'

export class More extends Component {

    render() {
        const list = [
            {
                title: 'Mở bằng trình duyệt',
                icon: 'chrome',
                link: 'https://baobaoshop.live'
            },
            {
                title: 'Liên Hệ & Hỗ Trợ',
                icon: 'envelope',
                link: 'https://baobaoshop.live/contact'
            },
            {
                title: 'Giới thiệu',
                icon: 'info-circle',
                link: 'https://baobaoshop.live'
            },
        ]
        return (
            <NativeBaseProvider >
                <PreventBackButtonNav />
                <Header title="Menu" navigation={this.props.navigation} />
                {/* <Center > */}
                <View style={{ marginTop: 10 }}>
                    {
                        list.map((item, i) => (
                            <TouchableOpacity
                                onPress={() => { Linking.openURL(item.link) }}
                                key={i}>
                                <ListItem bottomDivider>
                                    <Icon
                                        name={item.icon}
                                        type='font-awesome'
                                    />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            </TouchableOpacity>
                        ))
                    }
                    <Center>
                        <Text style={{ color: "#999594", marginTop: 10 }}>baobaoshop version 1.1.2</Text>
                    </Center>
                </View>
                {/* </Center> */}
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </NativeBaseProvider>
        )
    }
}

export default More







