import React, { Component } from 'react';
import { View, StyleSheet, Linking, Platform } from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux'

import Spinner from 'react-native-spinkit'

import firebase from '../../config/firebase';
import messagesData from '../../config/data';

import NavBar from '../../components/NavBar/NavBar';
// import ActiveScreen from "./screens/ActiveScreen";
// import CustomView from './CustomView';

import styles from './styles';

const filterBotMessages = (message) => !message.system && message.user && message.user._id && message.user._id === 2;
const findStep = (step) => (_, index) => index === step - 1;

class MessageScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      step: 0,
      appIsReady: false,
      customText : ''
    };

    this.onSend = this.onSend.bind(this);
    this.parsePatterns = this.parsePatterns.bind(this);
  }

  async componentWillMount() {

    // Get messgages from Firebase.
    this.setState({ messages: messagesData.filter((message) => message.system), appIsReady: true });
  }

  onSend(messages = []) {
    // TODO: Push messages into 1 Chat Room.
    console.log(messages);
    const newRef = firebase.database().ref('messages').push();
    newRef.set(messages[0]);


    // Send new message to Firebase
    const step = this.state.step + 1;
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [{ ...messages[0], sent: true, received: true }]),
      step,
    }));

    // console.log(this.state.messages);



    // Bot reply
    setTimeout(() => this.botSend(step), 1200 + Math.round(Math.random() * 1000));
  }

  botSend(step = 0) {
    const newMessage = messagesData
      .reverse()
      .filter(filterBotMessages)
      .find(findStep(step));
    if (newMessage) {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, newMessage),
      }));
    }
  }

  parsePatterns(linkStyle) {
    return [
      {
        pattern: /#(\w+)/,
        style: { ...linkStyle, color: 'darkorange' },
        onPress: () => Linking.openURL('http://gifted.chat'),
      },
    ];
  }

  setCustomText = (text) => {
    if (!text) this.setState({
      customText : 'jack'
    });
  }
  render() {
    if (!this.state.appIsReady) {
      return <Spinner type={'ThreeBounce'}/>;
    }
    return (
      <View style={styles.container} accessible accessibilityLabel="main" testID="main">
        <NavBar />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          // renderCustomView={CustomView}
          // keyboardShouldPersistTaps="never"
          user={{
            _id: 1,
          }}
          parsePatterns={this.parsePatterns}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    );
  }

}


export default MessageScreen;
