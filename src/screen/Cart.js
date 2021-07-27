import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'
import { Input, Center, Box, NativeBaseProvider, Button } from "native-base"
import { Icon, Badge, ListItem, Avatar } from 'react-native-elements'
import { connect } from 'react-redux';
import { marginBottom, marginTop } from 'styled-system';
import CallAPI from '../component/callAPIMainServer'
import CartItem from '../component/CartItem'


class Cart extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            listProduct: []
        })
    }





    componentDidMount() {
        const { userPhoneLogined, token } = this.props.rootReducer;
        CallAPI(token, `Cart/${userPhoneLogined}`).then(res => {
            this.setState({
                listProduct: res.data
            })
            console.log(this.state.listProduct)
        }).catch(() => {
            console.log("LỖI LẤY DANH SÁCH GIỎ HÀNG");
        })
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title="Giỏ hàng" navigation={this.props.navigation} />
                <NativeBaseProvider>
                    {this.props.rootReducer.cartCounter === 0 ?
                        <Text>Giỏ hàng trống </Text>
                        :
                        (this.state.listProduct.length === 0 ? <ActivityIndicator size="large" color="#0000ff" /> :
                            <View>
                                <View style={{ width: '100%', height: '80%' }} >
                                    <ScrollView style={{ marginHorizontal: 10 }}
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {this.state.listProduct.map((item) => (
                                            <CartItem
                                                key={item.productID}
                                                productID={item.productID}
                                                name={item.name}
                                                price={item.price}
                                                quantity={item.quantity}
                                                thumbnail={item.thumbnail}
                                            />
                                        ))}
                                    </ScrollView>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginLeft: 30, justifyContent: "space-between" }}>
                                    <View  >
                                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Thành Tiền</Text>
                                        <Text>Phí ship : 0đ</Text>
                                        <Text>Tổng cộng: 32423đ</Text>
                                    </View>
                                    <View>
                                        <Button>Xác nhận thanh toán</Button>
                                    </View>
                                    <View>
                                    </View>
                                </View>
                            </View>
                        )
                    }
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

