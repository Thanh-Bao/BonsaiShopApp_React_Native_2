import React, { Component } from 'react'
import { Text, View, ActivityIndicator, ScrollView, ToastAndroid } from 'react-native'
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RenderHTML from '../component/RenderHTMLToText'
import NavigationBar from '../component/NavigationBar';
import Slideshow from 'react-native-image-slider-show-razzium';
import { updateCartCounter } from '../store/action/countCartItem'
import { ListItem, Avatar, Icon, Button } from 'react-native-elements'
import { switchScreen } from '../store/action/SwitchScreen'
import { addUserPhoneLogin } from '../store/action/addUserPhoneLogin'
import Styles from "../component/Styles"
import callAPI from '../component/callAPIMainServer'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productID: this.props.route.params.productID,
            product: null,
            position: 1,
            interval: null,
            dataSource: [
                {
                    url: 'https://i.stack.imgur.com/y9DpT.jpg',
                }, {
                    url: 'https://i.stack.imgur.com/y9DpT.jpg',
                },
            ],
            listSpec: [
                {
                    name: 'Chiều cao',
                    icon: "arrows-v",
                    subtitle: 'N/A'
                },
                {
                    name: 'Xuất xứ',
                    icon: "globe",
                    subtitle: 'N/A'
                },
            ]
        }
    }

    showToast = productName => {
        ToastAndroid.show(`Đã thêm ${productName} vào giỏ hàng !`, ToastAndroid.SHORT);
    };


    updateCartCounterAsync = async (count) => {
        await AsyncStorage.setItem("CART_COUNTER", count);
    }

    addCart = (productID, productName) => {
        if (this.props.rootReducer.userPhoneLogined === null) {
            this.props.navigation.navigate('Login')
        } else {
            let userPhone = this.props.rootReducer.userPhoneLogined;
            callAPI(`Cart/${userPhone}`, 'PUT', { productID: productID }).then(() => {
                this.showToast(productName);
                callAPI(`Cart/count/${userPhone}`, 'GET').then(
                    res => {
                        this.props.updateCartCounter(res.data.count);
                        // localStorage.setItem("TOTAL_ITEM_CART", res.data.count);
                        this.updateCartCounterAsync(`${this.props.rootReducer.cartCounter}`)
                    }
                ).catch(err => {
                    console.log("Lỗi lấy số lượng giỏ hàng");
                    console.log(err);
                })
            }
            ).catch(
                err => {
                    console.log(err);
                    alert("Thêm vào giỏ hàng thất bại, Xóa LOCALSTORAGE & Ctrl+F5 & mở tab ấn danh");
                }
            )
        }
    }



    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://baobaoshop.live/api/products/' + this.state.productID
        }).then((response) => {

            const { detailImage, thumbnail, height, origin } = response.data;

            this.setState({
                product: response.data,
                dataSource: [
                    {
                        url: detailImage,
                    }, {
                        url: thumbnail,
                    },
                ],
                listSpec: [
                    {
                        name: 'Chiều cao',
                        icon: "arrows-v",
                        subtitle: height + " cm"
                    },
                    {
                        name: 'Xuất xứ',
                        icon: "globe",
                        subtitle: origin
                    },
                ]
            })
        }).catch((err) => {
            alert('lỗi lấy danh sách sản phẩm')
        })
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 2000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        var numeral = require('numeral');
        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title={`thông tin ${this.state.product == null ? "" : this.state.product.name}`} navigation={this.props.navigation} />

                {this.state.product == null ? <View style={Styles.centerColumn}>
                    <View style={Styles.centerColumn}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                            <Text >Vui lòng chờ ...</Text>
                        </View>
                    </View>
                </View>
                    :
                    <ScrollView style={{ marginBottom: 55 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={Styles.centerRow}>
                            <Slideshow
                                style={{ marginTop: 50 }}
                                dataSource={this.state.dataSource}
                                position={this.state.position}
                                onPositionChanged={position => this.setState({ position })} />
                        </View>
                        <View style={Styles.centerRow}>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>{this.state.product.name}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', marginTop: 30, marginLeft: 20, marginRight: 30 }}>
                            <Text style={{ fontSize: 25, fontWeight: "bold", color: 'red' }}>  {numeral(this.state.product.price).format('0,0')} đ</Text>
                            <Button
                                onPress={() => { this.addCart(this.state.product.productId, this.state.product.name) }}
                                icon={<Icon name='add-shopping-cart' color='#ffff' />}
                                buttonStyle={{ backgroundColor: '#f76f00', borderRadius: 5, fontWeight: "900" }}
                                title='Thêm vào giỏ hàng' />
                        </View>


                        <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                            <View style={{ marginTop: 30 }}>
                                {
                                    this.state.listSpec.map((l, i) => (
                                        <ListItem key={i} bottomDivider>
                                            <Icon
                                                name={l.icon}
                                                type='font-awesome'
                                                size={30}
                                            />
                                            <ListItem.Content>
                                                <ListItem.Title>{l.name}</ListItem.Title>
                                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                                    ))
                                }
                            </View>
                            <Text style={{ marginLeft: 10, marginTop: 20, marginBottom: -10, fontSize: 18, fontWeight: "bold" }}>Mô tả chi tiết:</Text>
                            <RenderHTML source={this.state.product.description} />
                        </View>
                    </ScrollView>
                }

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
        switchScreen,
        addUserPhoneLogin,
        updateCartCounter
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Detail);




