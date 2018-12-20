import React from 'react'
import PropTypes from 'prop-types'

// it has posts of current user.
import contactData from '../../assets/data/contact.json'

import Profile from './Profile'
import { connect } from 'react-redux';

// const ProfileScreen = () => <Profile {...this.props} {...contactData} />

class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }
  render () {
    return (
      <Profile {...this.props} {...contactData} />
    )
  }
}

// ProfileScreen.navigationOptions = () => ({
//   header: null,
// })

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
