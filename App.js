import React, { Component } from 'react'
import { StatusBar, BackHandler, Alert, Text } from 'react-native'
import Router from './src/component/Router'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/store/RootReducer';

import * as ScreenOrientation from 'expo-screen-orientation';

import { useFonts, Nunito_400Regular } from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';

const store = createStore(rootReducer);

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
}

export default function App() {
  changeScreenOrientation();

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store} >
        <StatusBar hidden={true} />
        <Router />
      </Provider>
    );
  }
}



