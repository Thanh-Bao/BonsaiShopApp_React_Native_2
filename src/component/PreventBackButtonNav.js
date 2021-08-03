import React, { Component } from 'react'
import { Text, View, Button, FlatList, StatusBar, BackHandler, Alert } from 'react-native';

export class preventBackButtonNav extends Component {
    backAction = () => {
        Alert.alert(":((", "Bạn chắc chắn muốn thoát?", [
            {
                text: "Ở lại",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Xác nhận thoát", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }
    render() {
        return (
            <View>
            </View>
        )
    }
}

export default preventBackButtonNav
