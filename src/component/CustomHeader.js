import React, {Component} from 'react';
import { Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';


const BackButton = (props) => {
    return (
        <Icon
            name='chevron-left'
            type='font-awesome'
            size={20}
            color="#fff"
            onPress={() => { props.navigation.goBack() }}
        />
    );
}

const CustomHeader = (props) => {
    return (
        <Header
            leftComponent={<BackButton navigation={props.navigation} />}
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        />
    );
}

export default CustomHeader;