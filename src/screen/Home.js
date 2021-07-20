import React, { Component } from 'react'
import { Text, View, Button, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchScreen } from '../store/action/SwitchScreen'

import NavigationBar from '../component/NavigationBar';

class Home extends Component {

    render() {
        const DATA = [
            {
                id: 'bd7acbe1a-c1b1-46c2-aed5-3ad53abb28ba',
                title: 'First Item',
            },
            {
                id: '3ac68a1fc-c605-48d3-a4f8-fbd91aa97f63',
                title: 'Second Item',
            },
            {
                id: '58694a0f-3da1-471f-bd96-1455171e29d72',
                title: 'Third Item',
            },
            {
                id: 'bd7acbea-c1b1-46c12-aed5-3ad53abb28ba',
                title: 'First Item',
            },
            {
                id: '3ac68afc-c605-418d3-a4f8-fbd91aa97f63',
                title: 'Second Item',
            },
            {
                id: '58694a0f-3da1-471f1-bd96-145571e29d72',
                title: 'Third Item',
            },
            {
                id: 'bd7acbea-c1b1-46c2-a1ed5-3ad53abb28ba',
                title: 'First Item',
            },
            {
                id: '3ac68afc-c605-48d3-a14f8-fbd91aa97f63',
                title: 'Second Item',
            },
            {
                id: '58694a0f-3da1-471f-bd196-145571e29d72',
                title: 'Third Item',
            },
            {
                id: 'bd7acbea-c1b1-46c2-ae11d5-3ad53abb28ba',
                title: 'First Item',
            },
            {
                id: '3ac68afc-c605-48d3-a4f18-fbd91aa97f63',
                title: 'Second Item99',
            },
            {
                id: '58694a0f-3da1-471f-bd916-145571e29d72',
                title: 'Third Item',
            },
            {
                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                title: 'First Item',
            },
            {
                id: '3ac68afc-c605-48d3-a4f8-fbd911aa97f63',
                title: 'Second Item',
            },
            {
                id: '58694a0f-3da1-471f-bd96-1451571e29d72',
                title: 'Third Itemmm',
            },


        ];
        const Item = ({ title }) => (
            <View >
                <Text style={{ marginTop: 70 }} >{title}</Text>
            </View>
        );

        const renderItem = ({ item }) => (
            <Item title={item.title} />
        );
        return (
            <View style={{ flex: 1 }}>
                {/* <Card navigation={this.props.navigation} title="huhu11" itemIId={999} />
                <Card navigation={this.props.navigation} title="huhu2" itemIId={123} /> */}
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
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
