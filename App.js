import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import Router from './src/component/Router'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/store/RootReducer';

import * as ScreenOrientation from 'expo-screen-orientation';

const store = createStore(rootReducer);

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
}

class App extends Component {
  
  render() {
    changeScreenOrientation();
    return (
      <Provider store={store}>
          <StatusBar hidden={true}/>
          <Router />
        </Provider>
    );
  }
}

export default App;


