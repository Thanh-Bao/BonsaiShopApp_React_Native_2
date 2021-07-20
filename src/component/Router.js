import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/Home';
import Detail from '../screen/Detail';
import Search from '../screen/Search';
import Cart from '../screen/Cart';
import Account from '../screen/Account';

export default function Router() {
    const Stack = createStackNavigator();
    return (
        //root
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
                <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
                <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


