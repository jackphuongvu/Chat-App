import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
  AsyncStorage
} from 'react-native';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import firebase from 'firebase'

import {keys} from '../../config'
import styles from './styles';
import spinner from '../../assets/images/loading.gif';

import {loginDefault, getUser, loginFacebook, loginGoogle} from '../../actions/user';
import LoginGoogle from './LoginGoogle'
import LoginFacebook from './LoginFacebook'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const mapStateToProps = state => state;

class LoginButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    // this._onPress = this._onPress.bind(this);
  }

  _onPress = () => {
    const {
      dispatch, email, password } = this.props;

    if (this.state.isLoading) return;
    if (!(email && password)) return

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    // TODO: Send request to Server.
    dispatch(loginDefault(email, password)).then((result) => {
      // console.log(data);
      // await AsyncStorage.setItem('accessToken', 'abc');

      // After login
      // setTimeout(() => {
      //   // Alert('this._onGrow');
      //   this._onGrow();
      // }, 2000);
      // console.log('after auth');
      // this._onGrow()

      if (!result.message) {
        dispatch(getUser()).then((result) => {
          // Work with entire screens

          // Open pink screen.
          setTimeout(() => {
            // Alert('this._onGrow');
            this._onGrow();
          }, 2000);

          // Change Pink screen to Home Screen
          setTimeout(() => {
            // Actions.secondScreen();
            // Navigate to Main Screen right here.
            this.setState({isLoading: false});
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
            this.props.navigation.navigate('MainScreen');

          }, 2300);

          //
        });
      } else {
        // show Alert
        // Dont have account
        if (result.type === 'wrong_account')
          Alert.alert(
            "Can't Find Account",
            this.props.auth.error,
            [
              {text: 'CREATE ACCOUNT', onPress: () => {
                  console.log('Ask me later pressed')
                  // Navigate to Sign Up Screen
                }},
              {text: 'TRY AGAIN', onPress: () => console.log('Cancel Pressed')}, // style: 'cancel'
            ],
            { cancelable: true }
          )
        else if (result.type === 'wrong_password')
          Alert.alert(
            "Incorrect Password",
            this.props.auth.error,
            [
              {text: 'OK', onPress: () => console.log('Cancel Pressed')}, // style: 'cancel'
            ],
            // { cancelable: true }
          )

        // Wrong password

        this.setState({isLoading: false});
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      }

    })
      .catch(error => {
        // create function turn off
        this.setState({isLoading: false});
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      });
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>

        <LoginFacebook/>
        <LoginGoogle/>

      </View>
    );
  }
}

export default connect(mapStateToProps)(LoginButton);
