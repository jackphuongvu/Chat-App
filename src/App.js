import React, { Component } from 'react';
import {
  View, Text
} from 'react-native';
import DropdownAlert from "react-native-dropdownalert";

import { applyMiddleware,  createStore } from 'redux';
import rootReducer from './reducers';
import {Provider, connect} from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {DropDownHolder} from './config'
import {
  AppNavigator,
  middleware} from './containers/AppNavigator';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    middleware,
    thunkMiddleware,
    loggerMiddleware
  )
);

const RootApp = () => (
  <View style={{
    flex : 1
  }}>
    <AppNavigator />
    <DropdownAlert ref={ref => {
      DropDownHolder.setDropDown(ref)
    }}
                   closeInterval={1000}

    />
  </View>
);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <RootApp />
      </Provider>
    );
  }
}

export default App;
