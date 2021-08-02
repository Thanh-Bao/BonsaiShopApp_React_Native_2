// import React, { Component } from 'react'
// import { Text, View, BackHandler, Alert, TouchableOpacity, Linking } from 'react-native'
// import NavigationBar from '../component/NavigationBar';
// import PreventBackButtonNav from '../component/PreventBackButtonNav'
// import Header from '../component/CustomHeader'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Input, Center, Box, NativeBaseProvider, Button } from "native-base"
// import { ListItem, Icon } from 'react-native-elements'

// export class Purchase extends Component {

//     constructor(props) {
//         super(props);
//         this.state = ({
//             orderID: this.props.route.params.orderID
//         })
//     }

//     render() {
//         return (
//             <NativeBaseProvider >
//                 <PreventBackButtonNav />
//                 <Header title="Menu" navigation={this.props.navigation} />
//                 <Center >

//                     <Text>OrderID = {this.state.orderID}</Text>

//                 </Center>
//                 <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
//                     <NavigationBar navigation={this.props.navigation} />
//                 </View>
//             </NativeBaseProvider>
//         )
//     }
// }

// export default Purchase


import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Center, NativeBaseProvider, Select } from "native-base";
import { Icon, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import CallAPI from '../component/callAPIMainServer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Purchase = (props) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [nameProvince, setNameProvince] = useState("");
    const [nameDistrict, setNameDistrict] = useState("");
    const [nameWard, setNameWard] = useState("");
    const [street, setStreet] = useState("");

    const [username, setUsername] = useState("");

    const [validation, setValidation] = useState(false);

    const URL = "https://baobaoshop.live/api/"


    const { orderID, sum } = props.route.params


    // Get Provinces
    useEffect(() => {
        axios({
            method: "GET",
            url: URL + "Address/provinces"
        }).then(
            res => { setProvinces(res.data.data), setWards([]) }
        ).catch(
            () => alert("lỗi lấy danh sách tỉnh")
        )
    }, []);

    //Get Districts
    useEffect(() => {
        if (provinces.length != 0) {
            axios({
                method: "GET",
                url: URL + "Address/districts",
                params: { province_id: selectedProvince }
            }).then(
                res => {
                    setDistricts(res.data.data)
                }
            ).catch(
                () => alert("lỗi lấy danh sách Quận huyện")
            )
        }
    }, [selectedProvince]);

    //Get Wards
    useEffect(() => {
        if (districts.length != 0) {
            axios({
                method: "GET",
                url: URL + "Address/wards",
                params: { district_id: selectedDistrict }
            }).then(
                res => setWards(res.data.data)
            ).catch(
                () => alert("lỗi lấy danh sách phường, xã")
            )
        }
    }, [selectedDistrict]);

    useEffect(() => {
        getUserName();
    }, []);

    function submitUserData() {
        const address = "tỉnh " + nameProvince + ", huyện " + nameDistrict + ", xã " + nameWard + ", " + street;
        const fullName = username;
        if (nameProvince == "" || nameDistrict == "" || nameWard == "" || street == "" || username == "") {
            alert("hãy nhập đủ thông tin")
        } else {
            const body = {
                address: address,
                name: fullName
            }
            const { userPhoneLogined, token } = props.rootReducer
            CallAPI(token, `Users/${userPhoneLogined}`, 'PUT', null, body).then(() => {
                storeUserName(fullName);
                CallAPI(token, 'Orders/accept-purchase', 'POST', { phone: userPhoneLogined }).then(() => {
                    setValidation(true)
                })
                    .catch(() => alert("lỗi thanh toán"))
            }).catch(() => alert("lỗi cập nhật thông tin khác hàng"))
        }
    }

    function bankingHandler() {
        const { userPhoneLogined, token } = props.rootReducer
        CallAPI(token, 'Orders/check-transfer', 'POST', { orderID: orderID }).then(
            CallAPI(token, 'Orders/purchase-successful', 'POST', { orderId: orderID }).then(res => {
                alert("Đã xác thực thành công, bạn sẽ nhận được hàng từ 3-5 ngày");
            }).catch(() => {
                alert("lỗi cập nhật phương thức thanh toán, đơn hàng được chuyển qua COD")
            })
        ).catch(() => alert("bạn chưa chuyển tiền, hoặc hệ thống đang bảo trì"))
    }

    async function getUserName() {
        const value = await AsyncStorage.getItem("USER_NAME")
        if (value !== null) {
            setUsername(value);
        }
    }

    async function storeUserName(name) {
        await AsyncStorage.setItem("USER_NAME", name)

    }


    return (
        <NativeBaseProvider>
            <ScrollView>
                <Center>
                    <Text style={{ marginVertical: 30 }}>Tên người nhận hàng: </Text>
                    <Input
                        w="70%"
                        placeholder={"nhập họ tên"}
                        value={username}
                        onChangeText={e => { setUsername(e) }}
                    />
                    <Text style={{ marginVertical: 20 }} >Chọn địa chỉ giao hàng: </Text>
                    {/* provinces */}
                    <Select
                        selectedValue={selectedProvince}
                        w="70%"
                        placeholder="Chọn tỉnh, TP"
                        onValueChange={(itemValue) => {
                            setSelectedProvince(itemValue);
                            const { ProvinceName } = provinces.find(province => province.ProvinceID == itemValue);
                            setNameProvince(ProvinceName)
                        }
                        }>
                        {provinces.map(item =>
                            <Select.Item key={item.ProvinceID} label={item.ProvinceName} value={item.ProvinceID} />
                        )}
                    </Select>

                    {/* districts */}
                    <Select
                        w="70%"
                        placeholder="Chọn quận, huyện"
                        selectedValue={selectedDistrict}
                        onValueChange={(itemValue) => {
                            setSelectedDistrict(itemValue)
                            const { DistrictName } = districts.find(district => district.DistrictID == itemValue);
                            setNameDistrict(DistrictName);
                        }
                        }>
                        {districts.map(item =>
                            <Select.Item key={item.DistrictID} label={item.DistrictName} value={item.DistrictID} />
                        )}
                    </Select>
                    {/* Wards */}
                    <Select
                        w="70%"
                        placeholder="Chọn phường, xã"
                        selectedValue={selectedWard}
                        onValueChange={(itemValue) => {
                            setSelectedWard(itemValue);
                            const { WardName } = wards.find(ward => ward.WardCode == itemValue);
                            setNameWard(WardName)
                        }
                        }>
                        {wards.map(item =>
                            <Select.Item key={item.WardCode} label={item.WardName} value={item.WardCode} />
                        )}

                    </Select>

                    <Input
                        w="70%"
                        placeholder="Nhập tên đường, số nhà"
                        onChangeText={e => { setStreet(e) }}
                    />

                    <Text style={{ marginHorizontal: 30, color: "red", fontWeight: "bold", marginTop: 20 }}>
                        Bạn cần chuyển {sum} đ vào tài khoản momo 0943417917 với nội dung {orderID}
                    </Text>

                    <Button
                        onPress={() => {
                            submitUserData();
                            if (validation) {
                                // bankingHandler();
                                alert("Momo đang bảo trì, đơn hàng được chuyển qua COD")
                                props.navigation.navigate('Home')
                            }
                        }}
                        icon={<Icon name='credit-card'
                            type='font-awesome' color='#ffff' />}
                        buttonStyle={{ marginVertical: 20, borderRadius: 5, fontWeight: "900" }}
                        title=' Xác nhận đã chuyển tiền' />

                    <Text>Hoặc</Text>

                    <Button
                        onPress={() => {
                            submitUserData();
                            if (validation) {
                                alert("Xác nhận đơn hàng thành công, bạn sẽ nhận được hàng từ 3-5 ngày")
                                props.navigation.navigate('Home')
                            }
                        }}
                        icon={<Icon name='money'
                            type='font-awesome' color='#ffff' />}
                        buttonStyle={{ marginVertical: 20, borderRadius: 5, fontWeight: "900" }}
                        title=' Thanh toán COD' />

                </Center>
            </ScrollView>
        </NativeBaseProvider>
    )
}

const mapStateToProps = (state) => {
    const { rootReducer } = state
    return { rootReducer }
};

export default connect(mapStateToProps)(Purchase);

