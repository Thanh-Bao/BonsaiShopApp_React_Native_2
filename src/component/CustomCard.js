import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { decode } from 'he'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import callAPI from '../component/callAPIMainServer'



class CustomCard extends Component {
    constructor(props) {
        super(props)
    }


    addCart = productID => {
        let userPhone = this.props.rootReducer.userPhoneLogined;
        callAPI(`Cart/${userPhone}`, 'PUT', { productID: productID }).then(() => {
            callAPI(`Cart/count/${userPhone}`, 'GET', { productID: productID }).then(
                res => {
                    // this.props.dispatch({ type: "UPDATE_TOTAL_ITEM_CART", data: res.data });
                    // localStorage.setItem("TOTAL_ITEM_CART", res.data.count);
                }
            ).catch(() => {
                alert("Lỗi lấy số lượng giỏ hàng");
            })
        }
        ).catch(
            () => {
                alert("Thêm vào giỏ hàng thất bại, Xóa LOCALSTORAGE & Ctrl+F5 & mở tab ấn danh");
            }
        )

    }








    render() {
        var striptags = require('striptags');
        var numeral = require('numeral');

        return (
            <View>
                <Card>
                    <Card.Title style={{ fontSize: 30 }}>{this.props.name}</Card.Title>
                    <Card.Divider />
                    <Card.Image source={{ uri: `${this.props.thumbnail}` }}>
                    </Card.Image>


                    <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ fontSize: 30, fontWeight: '700', color: 'red' }}>
                            {numeral(this.props.price).format('0,0')} đ
                        </Text>
                    </View>

                    <Text
                        style={{ marginBottom: 10 }}
                        numberOfLines={3}
                    >
                        {decode(striptags(this.props.description))}

                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                        <Button
                            onPress={() => { this.props.navigation.navigate('Detail', { productID: this.props.productID }) }}
                            type="outline"
                            icon={<Icon name='visibility' color='#0066ff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 10, marginBottom: 0 }}
                            title='Chi tiết' />

                        <Button
                            onPress={() => { this.addCart(this.props.productID)}}
                            icon={<Icon name='add-shopping-cart' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 10, marginRight: 0, marginBottom: 0 }}
                            title='Chọn Mua' />
                    </View>
                </Card>
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

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CustomCard);
