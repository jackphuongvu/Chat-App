import React, { Component } from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';

// import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

// CreateStackNavigator
import Root from '../navigation/Root';

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);
// Root = RootNavigator
const AppWithNavigationState = reduxifyNavigator(Root, 'root');
const mapStateToProps = (state) => ({
  state : state.nav
});
const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { AppNavigator, middleware };
