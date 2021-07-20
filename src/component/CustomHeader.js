import React, { Component } from 'react';
import { Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import BackButton from './BackButton';


class CustomHeader extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Header
                leftComponent={<BackButton navigation={this.props.navigation} />}
                centerComponent={{ text: this.props.title, style: { color: '#fff' } }}
            />
        );
    }
}



export default CustomHeader;