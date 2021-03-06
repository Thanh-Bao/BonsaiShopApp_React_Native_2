// import React, { Component } from 'react'
// import { Text, View, BackHandler, Alert, TouchableOpacity, Linking } from 'react-native'
// import NavigationBar from '../component/NavigationBar';
// import PreventBackButtonNav from '../component/PreventBackButtonNav'
// import Header from '../component/CustomHeader'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Input, Center, Box, NativeBaseProvider, Button } from "native-base"
// import { ListItem, Icon } from 'react-native-elements'
// import { connect } from 'react-redux';
// import CallAPI from '../component/callAPIMainServer'

// export class Profile extends Component {


//     constructor(props) {
//         super(props);
//         this.state = {
//             listItem: [],
//             page: 1,
//         }
//     }

//     render() {
//         return (
//             <NativeBaseProvider >
//                 <PreventBackButtonNav />
//                 <Header title="Menu" navigation={this.props.navigation} />
//                 <Center >
//                     Profile
//                     Profile
//                     Profile
//                     Profile
//                     Profile
//                     Profile
//                     Profile
//                     Profile
//                     Profile
//                     Profile
//                     Profile
//                 </Center>
//                 <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
//                     <NavigationBar navigation={this.props.navigation} />
//                 </View>
//             </NativeBaseProvider>
//         )
//     }
// }


// const mapStateToProps = (state) => {
//     const { rootReducer } = state
//     return { rootReducer }
// };

// export default connect(mapStateToProps)(Profile)

import React, { Component } from 'react'
import { Text, View, Button, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchScreen } from '../store/action/SwitchScreen'
import { addUserPhoneLogin } from '../store/action/addUserPhoneLogin'
import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'
import OrderItem from '../component/OrderItem'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CallAPI from '../component/callAPIMainServer'
import { updateCartCounter } from '../store/action/countCartItem'
import { storeToken } from '../store/action/storeToken'


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listItem: [],
            page: 1,
        }
    }


    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const { userPhoneLogined, token } = this.props.rootReducer;

        CallAPI(token, `Orders/${userPhoneLogined}?page=` + this.state.page).then(
            res => {
                this.setState({
                    listItem: this.state.listItem.concat(res.data.list)
                })
            }).catch(() => {
                alert('l???i l???y danh s??ch s???n ph???m')
            })
    }




    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, this.getData
        )
    }

    clearStorage = async () => {
        try {
            await AsyncStorage.removeItem("USER_PHONE");
            await AsyncStorage.removeItem("CART_COUNTER");
            await AsyncStorage.removeItem("TOKEN");

            this.props.addUserPhoneLogin(null);
            this.props.updateCartCounter(0);
            this.props.storeToken("0000")

            this.props.navigation.navigate('Home')
        } catch (e) {
            alert('Failed to clear the async storage.')
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title="????n h??ng ???? mua" navigation={this.props.navigation} />

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>B???n ??ang ????ng nh???p b???ng t??i kho???n: {this.props.rootReducer.userPhoneLogined}</Text>
                <View style={{ width: "40%", marginLeft: 40, marginVertical: 10 }}>
                    <Button title="????ng xu???t" color="red"
                        onPress={() => { this.clearStorage() }}
                    ></Button>
                </View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>L???ch s??? ????n h??ng</Text>
                {this.state.listItem.length == 0 ?
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                            <Text >Vui l??ng ch??? ...</Text>
                        </View>
                    </View>
                    :
                    <FlatList style={{ marginBottom: 65 }}
                        data={this.state.listItem}
                        renderItem={({ item }) =>
                            <OrderItem
                                navigation={this.props.navigation}
                                timestamp={item.timestamp}
                                totalMoney={item.totalMoney}
                                productID={item.productID}
                                status={item.status}
                                address={item.address}
                                paymentMethod={item.paymentMethod}
                                orderId={item.orderId}
                                onUpdateList={() => { this.setState({ listItem: [] }), this.getData() }}
                            />
                        }
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={this.handleLoadMore}
                    />
                }



                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </View>)
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
        updateCartCounter,
        storeToken
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


