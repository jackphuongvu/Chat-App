import React, {Component} from "react"
import {TouchableHighlight, TouchableOpacity, Image, Text, StyleSheet, View} from 'react-native'
import {images} from '../../../config'
import styles from '../styles'
import {AccessToken, LoginManager} from "react-native-fbsdk";
import {loginFacebook} from "../../../actions/user";
import connect from "react-redux/es/connect/connect";
import {withNavigation} from "react-navigation";

class LoginFacebook extends Component {

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
        activeOpacity={0.85}
        style={[styles.socialButton, styles.facebookButton]}
        onPress={this.onLoginFacebook}>
        <View style={{
          flexDirection : 'row'
        }}>
          <View style={styles.socialButtonIcon}>
            <Image source={images.loginScreen.facebook}/>
          </View>
          <Text style={styles.socialButtonText}>FACEBOOK</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withNavigation(LoginFacebook));
