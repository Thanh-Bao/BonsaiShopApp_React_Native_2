import React, { Component } from 'react'
import Router from './src/component/Router'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/store/RootReducer';

const store = createStore(rootReducer);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;


