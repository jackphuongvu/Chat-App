import {StyleSheet} from "react-native";

// TODO:
// - Custom config to Border button
// - Custom color
const styles = StyleSheet.create({
  socialButton : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    height: 48,
    borderRadius : 4,
    padding : 20,
    backgroundColor : '#ffffff',
    marginBottom : 15
  },
  facebookButton : {
    backgroundColor : '#3b5998'
  },
  socialButtonIcon : {
    flex : 1,
    marginRight : 20,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  socialButtonText : {
    flex : 3,
    fontWeight: '400',
    color: '#ffffff',
    fontSize : 17
  },
  socialButtonGoogleText : {
    color : '#3c3c3c'
  }
});

export default styles
