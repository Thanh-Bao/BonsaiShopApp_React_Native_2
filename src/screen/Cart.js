import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'
import { Input, Center, Box, NativeBaseProvider, Button } from "native-base"
import { Icon, Badge, ListItem, Avatar } from 'react-native-elements'
import { connect } from 'react-redux';
import { marginBottom, marginTop } from 'styled-system';
class Cart extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title="Giỏ hàng" navigation={this.props.navigation} />
                <NativeBaseProvider>
                    {/* {this.props.rootReducer.cartCounter === 0 ?
                            <Text>Giỏ hàng trống </Text>
                            :
                            <Text>Cart {this.props.rootReducer.cartCounter}</Text>
                        } */}
                    <View style={{ width: '100%', height: '70%' }} >
                        <ScrollView style={{ marginHorizontal: 10 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            {[...new Array(10)].map((v, i) => (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        borderColor: "#a5a8a6",
                                        borderWidth: 1.5, paddingVertical: 10,
                                        borderRadius: 8, marginVertical: 3
                                    }}
                                    key={i} bottomDivider onPress={() => { }}>

                                    <View style={{ flexDirection: "row", marginTop: 25, marginHorizontal: 10 }}>
                                        <Icon
                                            style={{ marginTop: 25, marginHorizontal: 10 }}
                                            name='trash'
                                            type='font-awesome'
                                            size={30}
                                            color="red"
                                            onPress={() => { }}
                                        />
                                    </View>
                                    <Avatar
                                        rounded
                                        size={80}
                                        source={require('../media/bonsai_2.png')}
                                    />
                                    <ListItem.Content style={{ marginLeft: 5 }}>
                                        <ListItem.Title>
                                            <Text style={{ fontWeight: "bold" }}>Cây sen cạn {i}</Text>
                                        </ListItem.Title>
                                        <ListItem.Title>
                                            <Text style={{ fontSize: 12 }}>Cây sen cạn {i}</Text>
                                        </ListItem.Title>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 13 }}>Đơn giá 4344</Text>
                                        </View>
                                    </ListItem.Content>
                                    <View style={{ flexDirection: "row", marginTop: 25, marginHorizontal: 10 }}>
                                        <Icon
                                            style={{ marginTop: 25, marginHorizontal: 10 }}
                                            name='minus-circle'
                                            type='font-awesome'
                                            size={30}
                                            color="blue"
                                            onPress={() => { }}
                                        />
                                        <Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 7 }}>1</Text>
                                        <Icon
                                            style={{ marginTop: 25, marginHorizontal: 10 }}
                                            name='plus-circle'
                                            type='font-awesome'
                                            size={30}
                                            color="blue"
                                            onPress={() => { }}
                                        />
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: 15 }} >
                        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Thành Tiền</Text>
                        <Text>123</Text>
                        <Text>123</Text>
                        <Text>123</Text>
                        <Text>123</Text>
                        <Text>123</Text>
                        <Text>12399</Text>
                    </View>
                </NativeBaseProvider>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    const { rootReducer } = state
    return { rootReducer }
};

export default connect(mapStateToProps)(Cart);

