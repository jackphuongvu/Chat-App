import React, {Component} from "react"
import {TouchableHighlight, TouchableOpacity, Image, Text, StyleSheet, View} from 'react-native'
import {images} from '../../../../config'
import styles from '../styles'

class LoginFacebook extends Component {

  onLoginFacebook = () => {
    console.log('Custom func')
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

export default LoginFacebook
