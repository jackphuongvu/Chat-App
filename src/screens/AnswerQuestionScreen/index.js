import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ListAnswers from './ListAnswers';
import styles from './styles';
import NewWordsList from "../../containers/NewWordsList";

class AnswerQuestionScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Answer',
    headerRight : (
      <View style={{
        flexDirection : 'row'
      }}>
        <Button
          transparent
          style={{
            marginRight : 5
          }}
          onPress={navigation.state.params._onPressOpenEditScreenButton}
        >
          <Feather name='edit' size={30}/>
        </Button>
        <Button
          transparent
          style={{
            marginRight : 7
          }}
          onPress={navigation.state.params._onPressOpenNewWordScreenButton}
        >
          <FontAwesome name='file-word-o' size={30}/>
        </Button>
      </View>
      // <Button transparent
      //   // hasText bordered info
      //         style={{
      //           marginRight : 5
      //         }}
      //         onPress={navigation.state.params._onPressButton}
      // >
      //   <Feather name='edit' size={30}/>
      // </Button>
    ),
    // header : ({state}) => ({
    //   right : (
    //     <TouchableHighlight
    //       // hasText bordered info
    //       style={{
    //         marginRight : 5
    //       }}
    //       onPress={() => {state.params._onPressButton()}}>
    //       <Feather name='edit' size={30}/>
    //     </TouchableHighlight>
    //   )
    // }),
  });

  state = {
    topic_id : this.props.navigation.getParam('topic_id')
  }

  _onPressOpenEditScreenButton = () => {
    this.props.navigation.navigate('EditSpeechForTopicScreen', {
      topic_id : this.state.topic_id
    });
  }

  _onPressOpenNewWordScreenButton = () => {
    this.props.navigation.navigate('NewWordScreen', {
      topic_id : this.state.topic_id
    });
  }

  componentDidMount () {
    this.props.navigation.setParams({
      _onPressOpenEditScreenButton : this._onPressOpenEditScreenButton,
      _onPressOpenNewWordScreenButton : this._onPressOpenNewWordScreenButton
    });
  }

  _onPressButton = () => {
    /* TODO: Make a request to Firebase */
    // import user_id
    // topic_id
    this.props.navigation.navigate('EditSpeechForTopicScreen', {
      topic_id: this.props.navigation.getParam('id')
    });
  }

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'Question Title');
    const contentText = navigation.getParam('answer', '');

    return (
      <View style={{
        flex : 1
      }}>
        <Text style={[styles.questionItemTitle, {
          // flex : 1,
          padding : 10,
          backgroundColor : '#fff'
        }]}>{title}</Text>
        {/*<NewWordsList/>*/}
        <ListAnswers
          // {...this.props}

        />
      </View>
    );
  }
}

export default AnswerQuestionScreen;
