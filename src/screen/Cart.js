import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'
import { Input, Center, Box, NativeBaseProvider, Button, Avatar } from "native-base"
import { Icon, Badge, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { marginBottom, marginTop } from 'styled-system';
import CallAPI from '../component/callAPIMainServer'
import CartItem from '../component/CartItem'
import { bindActionCreators } from 'redux';
import { updateCartCounter } from '../store/action/countCartItem'
import AsyncStorage from '@react-native-async-storage/async-storage';


class Cart extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            listProduct: [],
            sum: 0
        });

    }

    componentDidMount() {
        this.updateList();


    }


    updateCartCounterAsync = async (count) => {
        await AsyncStorage.setItem("CART_COUNTER", count);
    }

    handleAfterDelete() {
        const { userPhoneLogined, token } = this.props.rootReducer;
        CallAPI(token, `Cart/count/${userPhoneLogined}`).then(
            res => {
                this.props.updateCartCounter(res.data.count);
                this.updateCartCounterAsync(`${this.props.rootReducer.cartCounter}`)
            }).catch(() => {
                alert("Lỗi lấy tổng sản phẩm giỏ hàng");
            })
        this.updateList();
    }

    updateList() {
        const { userPhoneLogined, token } = this.props.rootReducer;
        CallAPI(token, `Cart/${userPhoneLogined}`).then(res => {
            this.setState({
                listProduct: res.data
            })
        }).catch(() => {
            console.log("LỖI LẤY DANH SÁCH GIỎ HÀNG");
        })

        CallAPI(token, `Cart/count/${userPhoneLogined}`).then(
            res => {

                this.setState({ sum: res.data.sum })
                this.props.updateCartCounter(res.data.count);
                this.updateCartCounterAsync(`${this.props.rootReducer.cartCounter}`)
            }).catch(() => {
                alert("Lỗi lấy tổng sản phẩm giỏ hàng");
            })
    }

    render() {
        var numeral = require('numeral');
        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title="Giỏ hàng" navigation={this.props.navigation} />
                <NativeBaseProvider>
                    {this.props.rootReducer.cartCounter === 0 ?
                        <Center flex={1}>
                            <Avatar
                                size="2xl"
                                source={require('./../media/emptycart.png')}
                            ></Avatar>
                            <Text style={{ fontSize: 30, fontWeight: "900" }}>Giỏ hàng trống </Text>
                        </Center>
                        :
                        (this.state.listProduct.length === 0 ? <Center flex={1}>
                            <View style={{ flexDirection: "column", justifyContent: 'center' }}>
                                <ActivityIndicator size="large" color="#0000ff" />
                                <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                                    <Text >Vui lòng chờ ...</Text>
                                </View>
                            </View> </Center> :
                            <View>
                                <View style={{ width: '100%', height: '80%' }} >


                                    <FlatList
                                        style={{ marginHorizontal: 10 }}
                                        data={this.state.listProduct}
                                        renderItem={({ item }) => (
                                            <CartItem
                                                key={item.productID}
                                                productID={item.productID}
                                                name={item.name}
                                                price={item.price}
                                                quantity={item.quantity}
                                                thumbnail={item.thumbnail}
                                                onUpdateList={() => { this.handleAfterDelete() }}
                                                passingSum={(e) => {
                                                    this.setState({ sum: e })
                                                }}

                                            />
                                        )}
                                        keyExtractor={(item) => item.productID}
                                    />

                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginLeft: 30, justifyContent: "space-between" }}>
                                    <View  >
                                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Thành Tiền</Text>
                                        <Text>Phí ship : 0đ</Text>
                                        <Text>Tổng cộng: {numeral(this.state.sum).format('0,0')} </Text>
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


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateCartCounter,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

