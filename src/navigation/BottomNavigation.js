import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import ChatScreen from '../screens/ChatScreen';
import ListTopicScreen from "../screens/ListTopicScreen";
import QuestionScreen from "../screens/QuestionScreen";
import AnswerQuestionScreen from "../screens/AnswerQuestionScreen";
import EditSpeechForTopicScreen from "../screens/EditSpeechForTopicScreen";
import ProfileScreen from '../screens/ProfileScreen'
import UserScreen from '../screens/UserScreen'
import NewWordScreen from '../screens/NewWordScreen'

const ListAndUserStack = createStackNavigator({
  QuestionScreen : {
    screen : QuestionScreen,
  },
  AnswerQuestionScreen : {
    screen : AnswerQuestionScreen
  }
});

const ListTopicNavigator = createStackNavigator({
  ListTopicScreen : {
    screen : ListTopicScreen
  },
  QuestionScreen : {
    screen : QuestionScreen,
  },
  AnswerQuestionScreen : {
    screen : AnswerQuestionScreen
  },
  EditSpeechForTopicScreen : {
    screen : EditSpeechForTopicScreen
  },
  NewWordScreen : {
    screen : NewWordScreen
  }
});

const BottomNavigation = createBottomTabNavigator({
  ListTopic : {
    screen : ListTopicNavigator
  },
  // TODO:
  // Update chat Feature later.
  // Chat : {
  //   screen : ChatScreen
  // },
  // Profile : {
  //   screen : ProfileScreen
  // },
  User : {
    screen : UserScreen
  }
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      // console.log(navigation);
      const { routeName } = navigation.state;
      let iconName;
      /* Check active click Tabs */
      if (routeName === 'ListTopic') {
        iconName = `people${focused ? '' : '-outline'}`;
        return <MaterialIcons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      }
      // else if (routeName === 'Chat') {
      //   iconName = 'message';
      //   // iconName = `ios-options${focused ? '' : '-outline'}`;
      //   return <Entypo name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      // }
      else if (routeName === 'User') {
        iconName = `user-circle${focused ? '' : '-o'}`;
        return <FontAwesome name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});

export default BottomNavigation;
