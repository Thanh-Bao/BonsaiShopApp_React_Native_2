import React, { Component } from 'react'
import { Text, View, Button, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchScreen } from '../store/action/SwitchScreen'

import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import { Header } from 'react-native-elements';

import CustomCard from '../component/CustomCard'
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            page: 1
        }
    }



    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        axios({
            method: 'get',
            url: 'https://baobaoshop.live/api/Products?page=' + this.state.page
        }).then((respnse) => {
            this.setState({
                listProduct: this.state.listProduct.concat(respnse.data.list)
            })
        }).catch((err) => {
            alert('lỗi lấy danh sách sản phẩm')
        })
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, this.getData
        )
    }


    render() {



        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                {/* <Card navigation={this.props.navigation} title="huhu11" itemIId={999} />
                <Card navigation={this.props.navigation} title="huhu2" itemIId={123} /> */}
                <Header
                    centerComponent={{ text: 'Sản phảm mới', style: { color: '#fff' } }}
                />

                {this.state.listProduct.length == 0 ?
                <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                :
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
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Home);
