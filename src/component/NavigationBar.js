import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchScreen } from '../store/action/SwitchScreen'
class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeScreen: this.props.activeScreen != null ? this.props.activeScreen : "Home"
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={30}
                        color={this.props.rootReducer.currentScreen == "Home" ? "#0008ff" : "#000000"}
                        onPress={() => { this.props.switchScreen("Home"), this.props.navigation.navigate('Home') }}
                    />
                </View>
                <View style={styles.icon}>
                    <Icon
                        name='search'
                        type='font-awesome'
                        size={30}
                        color={this.props.rootReducer.currentScreen == "Search" ? "#0008ff" : "#000000"}
                        // onPress={() => { this.props.navigation.navigate('Search', { itemId: this.props.itemIId }) }}
                        onPress={() => { this.props.switchScreen("Search"), this.props.navigation.navigate('Search') }}
                    />
                </View>
                <View style={styles.icon}>
                    <Icon
                        name='shopping-cart'
                        type='font-awesome'
                        size={30}
                        color={this.props.rootReducer.currentScreen == "Cart" ? "#0008ff" : "#000000"}
                        onPress={() => { this.props.switchScreen("Cart"), this.props.navigation.navigate('Cart') }}
                    />
                </View>
                <View style={styles.icon}>
                    <Icon
                        name='user'
                        type='font-awesome'
                        size={30}
                        color={this.props.rootReducer.currentScreen == "Account" ? "#0008ff" : "#000000"}
                        onPress={() => { this.props.switchScreen("Account"), this.props.navigation.navigate('Account') }}
                    />
                </View>
                <View style={styles.icon}>
                    <Icon
                        name='bars'
                        type='font-awesome'
                        size={30}
                        color={this.props.rootReducer.currentScreen == "More" ? "#0008ff" : "#000000"}
                        onPress={() => { this.props.switchScreen("More"), this.props.navigation.navigate('More') }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: "#ffffff",
        borderRadius: 15,
        marginLeft: 5,
        marginRight: 5,
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    icon: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15
    }
});

const mapStateToProps = (state) => {
    const { rootReducer } = state
    return { rootReducer }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        switchScreen,
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);