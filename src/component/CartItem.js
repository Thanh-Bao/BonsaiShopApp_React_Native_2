import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'
import { Input, Center, Box, NativeBaseProvider, Button } from "native-base"
import { Icon, Badge, ListItem, Avatar } from 'react-native-elements'
import { connect } from 'react-redux';
import { marginBottom, marginTop } from 'styled-system';
import { bindActionCreators } from 'redux';
import { updateCartCounter } from '../store/action/countCartItem'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CallAPI from '../component/callAPIMainServer'
class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            quantity: this.props.quantity
        })
    }

    updateCartCounterAsync = async (count) => {
        await AsyncStorage.setItem("CART_COUNTER", count);
    }

    updateQuantity(productID, minus) {
        let userPhone = this.props.rootReducer.userPhoneLogined;
        let token = this.props.rootReducer.token;
        if (minus) {
            if (this.state.quantity > 1) {
                this.setState({
                    quantity: this.state.quantity - 1
                })
                CallAPI(token, `Cart/${userPhone}`, 'PATCH', { productID: productID }).catch(() => {
                    alert("Lỗi Thêm sản phẩm vảo giỏ hàng");
                })
            }
        } else {
            this.setState({
                quantity: this.state.quantity + 1
            })
            CallAPI(token, `Cart/${userPhone}`, 'PUT', { productID: productID }).catch(() => {
                alert("Lỗi Thêm sản phẩm vảo giỏ hàng");
            })
        }

        CallAPI(token, `Cart/count/${userPhone}`).then(
            res => {
                this.props.updateCartCounter(res.data.count);
                this.updateCartCounterAsync(`${this.props.rootReducer.cartCounter}`)
                this.props.passingSum(res.data.sum);
            }).catch(() => {
                alert("Lỗi lấy tổng sản phẩm giỏ hàng");
            })

    }

    deleteItem(productID) {
        let userPhone = this.props.rootReducer.userPhoneLogined;
        let token = this.props.rootReducer.token;
        CallAPI(token, `Cart/${userPhone}`, 'DELETE', { productID: productID }).catch(() => {
            alert("Lỗi Xóa sản phẩm");
        });

        CallAPI(token, `Cart/count/${userPhone}`).then(
            res => {
                this.props.updateCartCounter(res.data.count);
                this.updateCartCounterAsync(`${this.props.rootReducer.cartCounter}`)
                this.props.passingSum(res.data.sum);
            }).catch(() => {
                alert("Lỗi lấy tổng sản phẩm giỏ hàng");
            });
        this.props.onUpdateList();

    }

    render() {
        var numeral = require('numeral');
        return (
            <View
                style={{
                    flexDirection: "row",
                    borderColor: "#a5a8a6",
                    borderWidth: 1.5, paddingVertical: 10,
                    borderRadius: 8, marginVertical: 3
                }}

            >

                <View style={{ flexDirection: "row", marginTop: 25, marginHorizontal: 10 }}>
                    <Icon
                        style={{ marginTop: 25, marginHorizontal: 10 }}
                        name='trash'
                        type='font-awesome'
                        size={30}
                        color="red"
                        onPress={() => { this.deleteItem(this.props.productID) }}
                    />
                </View>
                <Avatar
                    rounded
                    size={80}
                    source={{ uri: this.props.thumbnail }}
                />
                <ListItem.Content style={{ marginLeft: 5 }}>
                    <ListItem.Title>
                        <Text style={{ fontWeight: "bold" }}>{this.props.name} </Text>
                    </ListItem.Title>
                    <ListItem.Title>
                        <Text style={{ fontSize: 12 }}>Đơn giá:{numeral(this.props.price).format('0,0')} đ </Text>
                    </ListItem.Title>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 13 }}>Tổng: {numeral(this.state.quantity * this.props.price).format('0,0')} đ</Text>
                    </View>
                </ListItem.Content>
                <View style={{ flexDirection: "row", marginTop: 25, marginHorizontal: 10 }}>
                    <Icon
                        style={{ marginTop: 25, marginHorizontal: 10 }}
                        name='minus-circle'
                        type='font-awesome'
                        size={30}
                        color="blue"
                        onPress={() => { this.updateQuantity(this.props.productID, true) }}
                    />
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 7 }}>{this.state.quantity}</Text>
                    <Icon
                        style={{ marginTop: 25, marginHorizontal: 10 }}
                        name='plus-circle'
                        type='font-awesome'
                        size={30}
                        color="blue"
                        onPress={() => { this.updateQuantity(this.props.productID, false) }}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
