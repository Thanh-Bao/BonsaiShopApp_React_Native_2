import React, { Component } from 'react'
import { Text, View, Image, Button, ToastAndroid, Alert } from 'react-native'
import { Card, ListItem, Icon, Badge } from 'react-native-elements'
import { decode } from 'he'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCartCounter } from '../store/action/countCartItem'
import CallAPI from '../component/callAPIMainServer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import unixTimeToDate from './UnixTimeToDate'
import { Modal, Center, NativeBaseProvider } from "native-base"


class OrderItem extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            showModal: false,
            listItem: []
        })
    }


    showToast = () => {
        ToastAndroid.show(`Đã hủy đơn hàng`, ToastAndroid.SHORT);
    };

    updateCartCounterAsync = async (count) => {
        await AsyncStorage.setItem("CART_COUNTER", count);
    }



    componentDidMount() {
        const { token } = this.props.rootReducer;
        CallAPI(token, 'Orders/orderdetail', null, { orderId: this.props.orderId }).then(res => {
            this.setState({
                listItem: res.data
            })
        }).catch(() => {
            alert("Lỗi lấy chi tiết đơn hàng")
        })
    }

    cancelOrder(orderId) {
        const { token } = this.props.rootReducer;
        CallAPI(token, 'Orders/cancel-order', 'POST', { orderId: orderId }).then(res => {
            if (res.data) {
                this.showToast();
                this.props.onUpdateList();
            } else {
                alert("Không thể hủy đơn hàng tại thời điểm này")
            }

        }).catch(() => {
            alert("Lỗi hủy đơn hàng")
        })
    }


    CancelAction = (id) => {
        Alert.alert(":((", "Bạn chắc chắn muốn hủy đơn hàng này?", [
            {
                text: "Không hủy",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Đồng ý hủy", onPress: () => this.cancelOrder(id) }
        ]);
        return true;
    };




    render() {
        var striptags = require('striptags');
        var numeral = require('numeral');

        let orderStatusLbl;
        switch (this.props.status) {
            case "Pending":
                orderStatusLbl = (
                    <Badge value="Chờ xác nhận" status="success" />
                );
                break;
            case "Shipping":
                orderStatusLbl = (
                    <Badge value="đang vận chuyển" status="primary" />
                );
                break;
            case "Finish":
                orderStatusLbl = (
                    <Badge value="Đã nhận hàng" status="success" />
                );
                break;
            case "Cancel":
                orderStatusLbl = (
                    <Badge value="Đã hủy" status="error" />
                );
                break;
            default:
                orderStatusLbl = this.props.status;
                break;
        }


        return (
            <NativeBaseProvider>
                <Card>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>{unixTimeToDate(this.props.timestamp)}</Text>
                    <Card.Divider />
                    <View>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ fontSize: 15, fontWeight: '700', marginTop: 3 }}> Tổng tiền: </Text>
                            <Text style={{ fontSize: 20, fontWeight: '700', color: 'red' }}>
                                {numeral(this.props.totalMoney).format('0,0')} đ
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, fontSize: 20 }}>
                            <Text>Trang thái: </Text>
                            {orderStatusLbl}
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text>Địa chỉ: {this.props.address}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ marginVertical: 3, fontSize: 15 }}>Phương thức thanh toán: </Text>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>{this.props.paymentMethod}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ fontSize: 15 }}>Mã đơn hàng: </Text>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>#{this.props.orderId}</Text>
                        </View>
                    </View>
                    <Text
                        style={{ marginBottom: 10 }}
                        numberOfLines={3}
                    >
                        {decode(striptags(this.props.description))}

                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                        <View style={{ borderRadius: 0, marginLeft: 0, marginRight: 10, marginBottom: 0 }}>
                            <Button
                                onPress={() => { this.setState({ showModal: true }) }}
                                title={'Chi tiết hóa đơn'} />
                            <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.CloseButton />
                                    <Modal.Header> <Text>Chi tiết đơn hàng #{this.props.orderId}</Text> </Modal.Header>
                                    <Modal.Body>
                                        {console.log(this.state.listItem)}
                                        Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
                                        ullamco deserunt aute id consequat veniam incididunt duis in sint
                                        irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
                                        officia tempor esse quis. Sunt ad dolore quis aute consequat. Magna
                                        exercitation reprehenderit magna aute tempor cupidatat consequat
                                        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
                                        cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim
                                        ullamco deserunt aute id consequat veniam incididunt duis in sint
                                        irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
                                        officia tempor esse quis. Sunt ad dolore quis aute consequat. Magna
                                        exercitation reprehenderit magna aute tempor cupidatat consequat
                                        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
                                        cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim
                                        exercitation reprehenderit magna aute tempor cupidatat consequat
                                        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
                                        cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim
                                        ullamco deserunt aute id consequat veniam incididunt duis in sint
                                        irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
                                        officia tempor esse quis. Sunt ad dolore quis aute consequat. Magna
                                        exercitation reprehenderit magna aute tempor cupidatat consequat
                                        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
                                        cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            title="Đóng"
                                            onPress={() => {
                                                this.setState({ showModal: false })
                                            }}
                                        />

                                    </Modal.Footer>
                                </Modal.Content>
                            </Modal>
                        </View>

                        <Button
                            onPress={() => { this.CancelAction(this.props.orderId) }}
                            color="red"
                            title='Hủy đơn' />
                    </View>
                </Card>
            </NativeBaseProvider >
        )
    }
}
const mapStateToProps = (state) => {
    const { rootReducer } = state
    return { rootReducer }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateCartCounter
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
