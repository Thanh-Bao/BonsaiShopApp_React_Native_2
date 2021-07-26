import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import Header from '../component/CustomHeader'
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import { Input, Center, Box, NativeBaseProvider, Button } from "native-base"
import { Icon, Badge } from 'react-native-elements'
import CustomCard from '../component/CustomCard'
import axios from 'axios';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: null,
            listProduct: [],
            showLoading: false
        }
    }


    getData = async () => {
        this.setState({
            showLoading: true
        })
        axios({
            method: 'get',
            url: 'https://baobaoshop.live/api/products/search',
            params: { keyword: this.state.keyword }
        }).then((respnse) => {
            this.setState({
                listProduct: respnse.data.list,
                showLoading: false
            })
        }).catch((err) => {
            alert('lỗi lấy danh sách sản phẩm')
        })
    }




    render() {
        return (
            < NativeBaseProvider style={{ flex: 1 }}>
                <PreventBackButtonNav />
                {console.log(this.state.keyword)}
                <Header title="Tìm cây cảnh" navigation={this.props.navigation} />
                <Center>
                    <Box w="80%" style={{ marginTop: 20 }}>
                        <Input
                            onChangeText={e => this.setState({
                                keyword: e
                            })}
                            InputRightElement={
                                <Button
                                    colorScheme="blue"
                                    onPress={() => this.getData()}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name='search'
                                            type='font-awesome'
                                            size={20}
                                            color="#ffffff"
                                        />
                                        <Text style={{ fontSize: 12, fontWeight: "900", color: "white" }}>
                                            Tìm
                                        </Text>
                                    </View>

                                </Button>

                            }
                            placeholder="Input" // mx={4}
                            _light={{
                                placeholderTextColor: "blueGray.400",
                            }}
                            _dark={{
                                placeholderTextColor: "blueGray.50",
                            }}
                        />
                    </Box>

                    {this.state.showLoading === true ? (<View style={{ marginTop: 100 }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                            <Text >Vui lòng chờ ...</Text>
                        </View>
                    </View>) :
                        <FlatList style={{ marginBottom: 65 }}
                            data={this.state.listProduct}
                            renderItem={({ item }) =>
                                <CustomCard
                                    navigation={this.props.navigation}
                                    name={item.name}
                                    thumbnail={item.thumbnail}
                                    description={item.description}
                                    price={item.price}
                                    productID={item.productID}
                                />
                            }
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.handleLoadMore}
                        />
                    }

                </Center>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </ NativeBaseProvider>
        )
    }
}

export default Search
