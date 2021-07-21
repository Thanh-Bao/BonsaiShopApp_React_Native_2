import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { decode } from 'he'

class CustomCard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var striptags = require('striptags');
        var numeral = require('numeral');
        return (
            <View>
                <Card>
                    <Card.Title style={{ fontSize: 30 }}>{this.props.name}</Card.Title>
                    <Card.Divider />
                    <Card.Image source={{ uri: `${this.props.thumbnail}` }}>
                    </Card.Image>


                    <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ fontSize: 30, fontWeight: '700', color: 'red' }}>
                            {numeral(this.props.price).format('0,0')} đ
                        </Text>
                    </View>

                    <Text
                        style={{ marginBottom: 10 }}
                        numberOfLines={3}
                    >
                        {decode(striptags(this.props.description))}

                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                        <Button
                            onPress={() => { this.props.navigation.navigate('Detail', { productID: this.props.productID }) }}
                            type="outline"
                            icon={<Icon name='visibility' color='#0066ff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 10, marginBottom: 0 }}
                            title='Chi tiết' />

                        <Button
                            icon={<Icon name='add-shopping-cart' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 10, marginRight: 0, marginBottom: 0 }}
                            title='Chọn Mua' />
                    </View>
                </Card>
            </View>
        )
    }
}

export default CustomCard;
