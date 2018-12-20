import React from 'react'
// import LinearGradient from 'react-native-linear-gradient'
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../Themes/Colors';

export default (props) => {
  const gradient = [Colors.purple, Colors.darkPurple]
  return (
    <LinearGradient
      colors={gradient}
      style={props.style}>
      {props.children}
    </LinearGradient>
  )
}

// <LinearGradient colors={gradient} style={props.style}>
//   {props.children}
// </LinearGradient>
