import React, { Component } from 'react'
import { Button } from 'react-native';

class Card extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Button
                title={this.props.title}
                onPress={() => { this.props.navigation.navigate('Detail', { itemId: this.props.itemIId }) }}
            />
        );
    }
}
export default Card;
