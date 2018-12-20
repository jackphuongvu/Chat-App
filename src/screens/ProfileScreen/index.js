import React from 'react'
import PropTypes from 'prop-types'

import contactData from '../../assets/data/contact.json'

import Profile from './Profile'

import { View } from 'react-native'

const ProfileScreen = () => {
  console.log(contactData);
  // return (
  //   <View style={{
  //     flex : 1,
  //     justifyContent : 'center',
  //     alignContent: 'center'
  //   }}>
      
  //   </View>
  // );

  return (
    <Profile 
      {...contactData} 
    />
  );
};

ProfileScreen.navigationOptions = () => ({
  header: null,
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
