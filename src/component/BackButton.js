import React, { Component } from 'react'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native'

export class BackButton extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity
                hitSlop={{ top: 50, bottom: 100, left: 100, right: 200 }}
                style={{ paddingLeft: 10 }} onPress={() => { this.props.navigation.navigate(this.props.rootReducer.previousScreen) }}>
                <Icon
                    name='chevron-left'
                    type='font-awesome'
                    size={20}
                    color="#fff"
                />
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    const { rootReducer } = state
    return { rootReducer }
};



export default connect(mapStateToProps)(BackButton);
