import {Component} from "react";
// import GradientButton from "react-native-gradient-buttons";
import styles from "../styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import {View, Text, TouchableOpacity, Platform} from "react-native";
import {withNavigation} from 'react-navigation';
// import {FBLoginManager, FBLogin} from 'react-native-facebook-login';
import { LoginManager, AccessToken} from "react-native-fbsdk";
import { connect } from 'react-redux';
import { loginFacebook } from "../../../actions/user";

// FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native

// import {loginDefault, getUser, loginFacebook, loginGoogle} from '../../../actions/user';
// LoginManager.setLoginBehavior('web');

class LoginFacebook extends Component {
  // componentWillMount () {
  //   if (Platform.OS === 'ios') {
  //     LoginManager.setLoginBehavior('web');
  //   } else
  //     LoginManager.setLoginBehavior('web_only');
  // }
  onLoginFacebook = async () => {
    const {dispatch, navigation} = this.props;
    // TODO:
    // - this props is lack of "navigation" attribute.
    // WEB_VIEW
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      function(result) {
        // console.log(result)
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              // --------------------------------
              fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${data.accessToken.toString()}`)
                .then(res => res.json())
                .then(res => {
                  let user = res.hasOwnProperty('user') ? res.user : res;
                  dispatch(loginFacebook(user))
                    .then((res) => {
                      console.log(res)
                      navigation.navigate('MainScreen');
                    })
                    .catch((error) => {
                      console.log(error)
                    });
                })
                .catch(e => {console.log(e)})
              // --------------------------------
            }
          )
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );

  }
  render () {
    return (
      <TouchableOpacity
        style={[styles.socialButton, {
          fontSize : 20,
          height : 50
        }]}
        onPress={this.onLoginFacebook}
      >
        <FontAwesome
          name="facebook"
          style={{ color: "white", fontSize: 18 }}
        />
        <Text>{" "}Sign-In with Facebook</Text>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withNavigation(LoginFacebook));
