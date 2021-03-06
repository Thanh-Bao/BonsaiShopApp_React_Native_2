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
            () => alert("l???i l???y danh s??ch t???nh")
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
                () => alert("l???i l???y danh s??ch Qu???n huy???n")
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
                () => alert("l???i l???y danh s??ch ph?????ng, x??")
            )
        }
    }, [selectedDistrict]);

    useEffect(() => {
        getUserName();
    }, []);

    function submitUserData() {
        const address = "t???nh " + nameProvince + ", huy???n " + nameDistrict + ", x?? " + nameWard + ", " + street;
        const fullName = username;
        if (nameProvince == "" || nameDistrict == "" || nameWard == "" || street == "" || username == "") {
            alert("h??y nh???p ????? th??ng tin")
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
                    .catch(() => alert("l???i thanh to??n"))
            }).catch(() => alert("l???i c???p nh???t th??ng tin kh??c h??ng"))
        }
    }

    function bankingHandler() {
        const { userPhoneLogined, token } = props.rootReducer
        CallAPI(token, 'Orders/check-transfer', 'POST', { orderID: orderID }).then(
            CallAPI(token, 'Orders/purchase-successful', 'POST', { orderId: orderID }).then(res => {
                alert("???? x??c th???c th??nh c??ng, b???n s??? nh???n ???????c h??ng t??? 3-5 ng??y");
            }).catch(() => {
                alert("l???i c???p nh???t ph????ng th???c thanh to??n, ????n h??ng ???????c chuy???n qua COD")
            })
        ).catch(() => alert("b???n ch??a chuy???n ti???n, ho???c h??? th???ng ??ang b???o tr??"))
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
                    <Text style={{ marginVertical: 30 }}>T??n ng?????i nh???n h??ng: </Text>
                    <Input
                        w="70%"
                        placeholder={"nh???p h??? t??n"}
                        value={username}
                        onChangeText={e => { setUsername(e) }}
                    />
                    <Text style={{ marginVertical: 20 }} >Ch???n ?????a ch??? giao h??ng: </Text>
                    {/* provinces */}
                    <Select
                        selectedValue={selectedProvince}
                        w="70%"
                        placeholder="Ch???n t???nh, TP"
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
                        placeholder="Ch???n qu???n, huy???n"
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
                        placeholder="Ch???n ph?????ng, x??"
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
                        placeholder="Nh???p t??n ???????ng, s??? nh??"
                        onChangeText={e => { setStreet(e) }}
                    />

                    <Text style={{ marginHorizontal: 30, color: "red", fontWeight: "bold", marginTop: 20 }}>
                        B???n c???n chuy???n {sum} ?? v??o t??i kho???n momo 0943417917 v???i n???i dung {orderID}
                    </Text>

                    <Button
                        onPress={() => {
                            submitUserData();
                            if (validation) {
                                // bankingHandler();
                                alert("Momo ??ang b???o tr??, ????n h??ng ???????c chuy???n qua COD")
                                props.navigation.navigate('Home')
                            }
                        }}
                        icon={<Icon name='credit-card'
                            type='font-awesome' color='#ffff' />}
                        buttonStyle={{ marginVertical: 20, borderRadius: 5, fontWeight: "900" }}
                        title=' X??c nh???n ???? chuy???n ti???n' />

                    <Text>Ho???c</Text>

                    <Button
                        onPress={() => {
                            submitUserData();
                            if (validation) {
                                alert("X??c nh???n ????n h??ng th??nh c??ng, b???n s??? nh???n ???????c h??ng t??? 3-5 ng??y")
                                props.navigation.navigate('Home')
                            }
                        }}
                        icon={<Icon name='money'
                            type='font-awesome' color='#ffff' />}
                        buttonStyle={{ marginVertical: 20, borderRadius: 5, fontWeight: "900" }}
                        title=' Thanh to??n COD' />

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

