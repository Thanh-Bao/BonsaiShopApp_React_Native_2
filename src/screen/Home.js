import React, { Component } from 'react'
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import Card from '../component/Card'


class Home extends Component {
    render() {
        const listItems = this.props.rootReducer.hihi.map((number) => (
            <Text>{number}</Text>)
        );
        return (
            <View>
                {listItems}
                {console.log(this.props.rootReducer.hihi)}
                <Card navigation={this.props.navigation} title="huhu11" itemIId={999} />
                <Card navigation={this.props.navigation} title="huhu2" itemIId={123} />
            </View>)
    }
}

const mapStateToProps = (state) => {
    const { rootReducer } = state
    return { rootReducer }
};

export default connect(mapStateToProps)(Home);