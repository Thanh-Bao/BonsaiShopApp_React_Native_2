import React, { Component } from 'react'
import { Text, View, ActivityIndicator, ScrollView, Image } from 'react-native'
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'
import axios from 'axios';

import RenderHTML from '../component/RenderHTMLToText'
import NavigationBar from '../component/NavigationBar';


class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productID: this.props.route.params.productID,
            product: null
        }

    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://baobaoshop.live/api/products/' + this.state.productID
        }).then((response) => {
            this.setState({
                product: response.data
            })
        }).catch((err) => {
            alert('lỗi lấy danh sách sản phẩm')
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title={`Chi tiết về ${this.state.product == null ? "" : this.state.product.name}`} navigation={this.props.navigation} />

                {this.state.product == null ? <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                            <Text >Vui lòng chờ ...</Text>
                        </View>
                    </View>
                </View>
                    :
                    <ScrollView
                        style={{ flex: 1, marginBottom: 55, marginRight: 10, marginLeft: 10 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
                            <Image
                                style={{
                                    flex: 1,
                                    width: null,
                                    height: 300,
                                }}
                                source={{ uri: this.state.product.detailImage }}
                            />
                        </View>

                        <RenderHTML source={this.state.product.description} />
                    </ScrollView>
                }

                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}

export default Detail


