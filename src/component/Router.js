import React, { Component } from 'react'
import { Text, View, BackHandler, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/Home';
import Detail from '../screen/Detail';
import Search from '../screen/Search';
import Cart from '../screen/Cart';
import More from '../screen/More';
import Login from '../screen/Login'
import Register from '../screen/Register'
import CreatePassword from '../screen/CreatePassword'
import Profile from '../screen/Profile'
import Purchase from '../screen/Purchase'


const Stack = createStackNavigator();
export default class Router extends Component {

    render() {
        return (
            //root
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
                    <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                    <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
                    <Stack.Screen name="More" component={More} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="CreatePassword" component={CreatePassword} options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                    <Stack.Screen name="Purchase" component={Purchase} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer >
        )
    }
}


