import React, {Component} from 'react';
import { AsyncStorage, View, Text, StatusBar, NativeModules, Platform, Image} from 'react-native';
import {images} from '../../config'
import WallPaper from './WallPaper'
import LoginButton from '../../containers/LoginButton'
import styles from './styles'

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

class LoginScreen extends Component {
  render () {
    return (
      <WallPaper>
        <View style={{
          marginTop : STATUSBAR_HEIGHT,
          flex : 1,
          justifyContent: 'space-between',
          // alignItems: 'center',
          padding : 30,
          paddingTop : 15,
          paddingBottom : 60,
          // paddingBottom : 0,
          // backgroundColor : 'red'
        }}>
          {/*<Image source={images.loginScreen.mainImage}/>*/}
          {/*<Text>Timeat</Text>*/}
          <Text style={[styles.title, {
            // backgroundColor : 'red',
            textAlign : 'left',
            marginBottom : 75
          }]}>Don’t think, it’s time to speak English!</Text>
          <LoginButton/>
        </View>
      </WallPaper>
    );
  }
}

export default LoginScreen






