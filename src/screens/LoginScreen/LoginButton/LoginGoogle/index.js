import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
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
import styles from "../styles";
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';
// import {loginGoogle} from "../../../actions/user";
import {images} from "../../../../config";

GoogleSignin.configure();

class LoginGoogle extends Component {
  onLoginGoogle = async () => {
    // console.log(this.props)
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   // this.setState({ userInfo });
    //   this.props.dispatch(loginGoogle(userInfo.user))
    //     .then((res) => {
    //       this.props.navigation.navigate('MainScreen');
    //     })
    //     .catch(e => console.log(e));
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (f.e. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    //   console.log(error)
    // }
  }
  render () {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.socialButton]}
        onPress={this.onLoginGoogle}>
        <View style={{
          flexDirection : 'row'
        }}>
          <View style={styles.socialButtonIcon}>
            <Image source={images.loginScreen.google}/>
          </View>
          <Text style={[styles.socialButtonText, styles.socialButtonGoogleText]}>GOOGLE</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withNavigation(LoginGoogle));
