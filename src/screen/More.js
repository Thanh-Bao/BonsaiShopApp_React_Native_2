// import React, { Component } from 'react'
// import { Text, View, BackHandler, Alert, TouchableOpacity, Linking } from 'react-native'
// import NavigationBar from '../component/NavigationBar';
// import PreventBackButtonNav from '../component/PreventBackButtonNav'
// import Header from '../component/CustomHeader'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Input, Center, Box, NativeBaseProvider, Button } from "native-base"
// import { ListItem, Icon } from 'react-native-elements'

// export class More extends Component {

//     render() {
//         const list = [
//             {
//                 title: 'Mở bằng trình duyệt',
//                 icon: 'chrome',
//                 link: 'https://baobaoshop.live'
//             },
//             {
//                 title: 'Liên Hệ & Hỗ Trợ',
//                 icon: 'envelope',
//                 link: 'https://baobaoshop.live/contact'
//             },
//             {
//                 title: 'Giới thiệu',
//                 icon: 'info-circle',
//                 link: 'https://baobaoshop.live'
//             },
//         ]
//         return (
//             <NativeBaseProvider >
//                 <PreventBackButtonNav />
//                 <Header title="Menu" navigation={this.props.navigation} />
//                 {/* <Center > */}
//                 <View style={{ marginTop: 10 }}>
//                     {
//                         list.map((item, i) => (
//                             <TouchableOpacity
//                                 onPress={() => { Linking.openURL(item.link) }}
//                                 key={i}>
//                                 <ListItem bottomDivider>
//                                     <Icon
//                                         name={item.icon}
//                                         type='font-awesome'
//                                     />
//                                     <ListItem.Content>
//                                         <ListItem.Title>{item.title}</ListItem.Title>
//                                     </ListItem.Content>
//                                     <ListItem.Chevron />
//                                 </ListItem>
//                             </TouchableOpacity>
//                         ))
//                     }
//                     <Center>
//                         <Text style={{ color: "#999594", marginTop: 10 }}>baobaoshop version 1.1.2</Text>
//                     </Center>
//                 </View>
//                 {/* </Center> */}
//                 <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
//                     <NavigationBar navigation={this.props.navigation} />
//                 </View>
//             </NativeBaseProvider>
//         )
//     }
// }

// export default More

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Center, NativeBaseProvider, Select } from "native-base";
import { Icon, Button } from 'react-native-elements'

const More = (props) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [nameProvince, setNameProvince] = useState("");
    const [nameDistrict, setNameDistrict] = useState("");
    const [nameWard, setNamedWard] = useState("");
    const [street, setStreet] = useState("");

    const [username, setUsername] = useState("");

    const URL = "https://baobaoshop.live/api/"

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

    function submitUserData() {
        const address = "tỉnh " + nameProvince + ", huyện " + nameDistrict + ", xã " + nameWard + ", " + street;
        const fullName = username;
        if (nameProvince == "" || nameDistrict == "" || nameWard == "" || street == "" || username == "") {
            alert("hãy nhập đủ thông tin")
        } else {
            alert(address + fullName)
        }
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <Center>
                    <Text style={{ marginVertical: 30 }}>Tên người nhận hàng: </Text>
                    <Input
                        w="70%"
                        placeholder="Nhập Họ Tên"
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
                            setNamedWard(WardName)
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

                    <Button
                        onPress={() => { submitUserData() }}
                        icon={<Icon name='credit-card'
                            type='font-awesome' color='#ffff' />}
                        buttonStyle={{ marginVertical: 30, borderRadius: 5, fontWeight: "900" }}
                        title=' Xác nhận đã chuyển tiền' />

                    <Text>Hoặc</Text>

                    <Button
                        onPress={() => { submitUserData() }}
                        icon={<Icon name='money'
                            type='font-awesome' color='#ffff' />}
                        buttonStyle={{ marginVertical: 30, borderRadius: 5, fontWeight: "900" }}
                        title=' Thanh toán COD' />

                </Center>
            </ScrollView>
        </NativeBaseProvider>
    )
}
export default More


const styles = StyleSheet.create({
    picker: {
        height: 60, width: "60%"
    }
})



