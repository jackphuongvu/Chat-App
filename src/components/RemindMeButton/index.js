import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import Images from '../../Themes/Images';
import styles from './styles';

// interface RemindMeProps {
//   on: boolean
//   onPress (): void
// }

const RemindMeButton = (props) => {
  // const { on, onPress } = props
  const { onPress } = props
  // const icon = on ? Images.activeNotificationIcon : Images.inactiveNotificationIcon
  // const buttonText = on ? 'Turn Off' : 'Remind Me'

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, styles.activeButton]}>
        {/* <Image source={icon} style={styles.icon} /> */}
        <Entypo name='chat' size={20} color="white" style={styles.icon} />
        <Text style={[styles.text, styles.activeText]}>
          Chat
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default RemindMeButton;
