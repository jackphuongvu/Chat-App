import React, { Component } from 'react';
import {View} from 'react-native';

import LoginGoogle from './LoginGoogle'
import LoginFacebook from './LoginFacebook'

class LoginButton extends Component {
  render () {
    return (
      <View style={{
        // flex : 1,
        // padding : 30
      }}>
        <LoginFacebook/>
        <LoginGoogle/>
      </View>
    );
  }
}

export default LoginButton
