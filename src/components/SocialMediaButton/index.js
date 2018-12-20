import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// ============
import styles from './styles';
// import ExamplesRegistry from '../Services/ExamplesRegistry'
import Images from '../../Themes/Images'

// Example
// ExamplesRegistry.addComponentExample('SocialMediaButton', () =>
//   <SocialMediaButton
//     network='twitter'
//     onPress={() => window.alert('Lets Get Social AF')}
//   />
// )

// interface SocialMediaButtonProps {
//   style?: StyleSheet
//   network: 'twitter' | 'github'
//   spacing?: 'left' | 'right'
//   onPress (): void
// }

const SocialMediaButton = (props) => {
  const { network, style, spacing, onPress } = props
  const imageSource = network === 'twitter' ? Images.twitterIcon : Images.githubIcon
  const spacingShim = spacing === 'right' ? 'right' : 'left'

  return (
    <TouchableOpacity
      style={[styles[spacingShim], style]}
      onPress={onPress}
      hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
      <Image source={imageSource} />
    </TouchableOpacity>
  )
}

export default SocialMediaButton;

SocialMediaButton.propTypes = {
  style : PropTypes.object, // PropTypes.object.isRequired
  network : PropTypes.oneOf(['twitter', 'github']),
  spacing : PropTypes.oneOf(['left', 'right']),
  onPress : PropTypes.func
};

// SocialMediaButton.defaultProps = {
//   label : '',
//   ImageUrl : 'http://cdn.akc.org/content/article-body-image/housetrain_adult_dog_hero.jpg',
//   onPress : () => {}
// };