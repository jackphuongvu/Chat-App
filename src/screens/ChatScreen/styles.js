import { StyleSheet, NativeModules, Platform } from 'react-native';
import AppStyles from '../../config/styles';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: AppStyles.colors.lightWhite,
    marginTop : STATUSBAR_HEIGHT
  }
});

export default styles;
