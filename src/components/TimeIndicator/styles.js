import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: -18
  },
  time: {
    fontFamily: Fonts.type.bold,
    fontSize: 8,
    color: Colors.snow,
    backgroundColor: Colors.transparent
  }
});

export default styles;