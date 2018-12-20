import React, { Component } from 'react'
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native'
import { Icon } from 'react-native-elements'
import {
  TabView,
  TabViewAnimated,
  TabBar,
  TabViewPagerScroll,
  TabViewPagerPan,
  SceneMap // Import test screen.
} from 'react-native-tab-view'
import PropTypes from 'prop-types'

import Posts from './Posts'
import styles from './Profile/styles'

class Profile extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    tabContainerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        words: PropTypes.string.isRequired,
        sentence: PropTypes.string.isRequired,
        paragraph: PropTypes.string.isRequired,
        image: PropTypes.string,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
        }),
      })
    ).isRequired,
  }

  static defaultProps = {
    containerStyle: {},
    tabContainerStyle: {},
  }

  state = {
    tabs: {
      index: 0,
      routes: [
        // { key: '1', title: 'active', count: 31 },
        // { key: '2', title: 'like', count: 86 },
        // { key: '3', title: 'following', count: 95 },
        // { key: '4', title: 'followers', count: '1.3 K' },

        // jack check
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ],
    },
  }

  onPressPlace = () => {
    console.log('place')
  }

  _handleIndexChange = index => {
    this.setState({
      tabs: {
        ...this.state.tabs,
        index,
      },
    })
  }

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicatorTab}
        renderLabel={this._renderLabel(props)}
        pressOpacity={0.8}
        style={styles.tabBar}
      />
    )
  }

  _renderScene = ({ route: { key } }) => {
    const { posts } = this.props
    switch (key) {
      // case '1':
      //   return <Posts containerStyle={styles.sceneContainer} posts={posts} />
      // case '2':
      //   return <Posts containerStyle={styles.sceneContainer} posts={posts} />
      // case '3':
      //   return <Posts containerStyle={styles.sceneContainer} posts={posts} />
      // case '4':
      //   return <Posts containerStyle={styles.sceneContainer} posts={posts} />
      default:
        return <View />
    }
  }

  _renderLabel = props => ({ route, index }) => {
    const inputRange = props.navigationState.routes.map((x, i) => i)
    const outputRange = inputRange.map(
      inputIndex => (inputIndex === index ? 'black' : 'gray')
    )
    const color = props.position.interpolate({
      inputRange,
      outputRange,
    })

    return (
      <View>
        <Animated.Text style={[styles.tabLabelText, { color }]}>
          {route.count}
        </Animated.Text>
        <Animated.Text style={[styles.tabLabelNumber, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    )
  }

  _renderPager = props => {
    return Platform.OS === 'ios' ? (
      <TabViewPagerScroll {...props} />
    ) : (
      <TabViewPagerPan {...props} />
    )
  }

  renderContactHeader = () => {
    const { avatar, name, bio } = this.props
    return (
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          <Image
            style={styles.userImage}
            source={{
              uri: avatar,
            }}
          />
          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}>{name}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{bio}</Text>
          </View>
        </View>
        <View style={styles.socialRow}>
          <View>
            {/* <Icon
              size={30}
              type="entypo"
              color="#3B5A98"
              name="facebook-with-circle"
              onPress={() => console.log('facebook')}
            /> */}
          </View>
          <View style={styles.socialIcon}>
            {/* <Icon
              size={30}
              type="entypo"
              color="#56ACEE"
              name="twitter-with-circle"
              onPress={() => console.log('twitter')}
            /> */}
          </View>
          <View>
            {/* <Icon
              size={30}
              type="entypo"
              color="#DD4C39"
              name="google--with-circle"
              onPress={() => console.log('google')}
            /> */}
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={styles.cardContainer}>
            {this.renderContactHeader()}
            {/* <TabViewAnimated */}
            {/* <TabView
              style={[styles.tabContainer, this.props.tabContainerStyle]}
              navigationState={this.state.tabs}
              // renderScene={this._renderScene}
              renderScene={SceneMap({
                first: FirstRoute,
                second: SecondRoute,
              })}
              // renderPager={this._renderPager}
              // renderHeader={this._renderHeader}
              onIndexChange={this._handleIndexChange}
            /> */}
            <TabView
              navigationState={this.state.tabs}
              renderScene={SceneMap({
                first: FirstRoute,
                second: SecondRoute,
              })}
              onIndexChange={index => this.setState({ index })}
              initialLayout={{ width: Dimensions.get('window').width }}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);

export default Profile
