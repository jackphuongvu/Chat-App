import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import LoginButton from '../../containers/LoginButton';

class LoginScreen extends Component {
  state = {
    email : '',
    password : ''
  }
  // constructor(props) {
  //   super(props);
  //   this._bootstrapAsync();
  // }
  // _bootstrapAsync = async () => {
  //   const userToken = await AsyncStorage.getItem('accessToken');
  //   console.log('Get access Token from Async Storage');
  //   console.log(userToken);
  // }
  onChangeEmail = (text) => {
    this.setState({
      email : text
    });
  }
  onChangePassword = (text) => {
    this.setState({
      password : text
    });
  }
  render() {
    return (
      <Wallpaper>
        <Logo />
        {/* <Alert/> */}
        <Form
          onChangeEmail={this.onChangeEmail}
          onChangePassword={this.onChangePassword}/>

        <LoginButton
          {...this.props}
          email={this.state.email}
          password={this.state.password} />
        {/* <LoginFacebookButton/> */}
        <SignupSection />
        {/*<ButtonSubmit />*/}
      </Wallpaper>
    );
  }
}

export default LoginScreen;
