import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableHighlight } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  Body,
  Button,
} from 'native-base';
import {connect} from 'react-redux'

import {getQuestions} from '../../actions/questions'
import uuid from 'uuidv4';

import {getQuestionByTopic, getQuestionByTopicAsync} from '../../helper/functions';
import styles from './styles';

const TopTitle = () => {
  return (
    <View
    // style={styles.row}
    >
      {/* <View style={styles.starNote}>
        <FontAwesome name="star" size={20} color="white"/>
      </View> */}
      <Text style={styles.title}>QUESTIONS FOR YOU</Text>
    </View>
  );
}

class QuestionScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Body>
        <TopTitle/>
      </Body>
    ),
    headerRight : (
      <View style={{
        flexDirection : 'row'
      }}>
        <Button
          // hasText bordered info
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
    )
  });

  state = {
    data : [],
    page : 1,
    loading : true,
    error : null,
    stickyHeaderIndices: [],
    topic_id : this.props.navigation.getParam('id')
    // questions : []
  }

  // TODO:
  // 1. check loading: success and Failing
  // - (with renderFooter): NOT DONE
  // 2. get data from API in page 1: DONE
  // 3. add Load more feature from FlatList

  // TODO: fetch questions from Laravel API.
  // Edit Screen
  _onPressOpenEditScreenButton = () => {
    this.props.navigation.navigate('EditSpeechForTopicScreen', {
      topic_id : this.state.topic_id
    });
  }

  _onPressOpenNewWordScreenButton = () => {
    // Turn on New words screen.
    // console.log('_onPressOpenNewWordScreenButton')
    this.props.navigation.navigate('NewWordScreen', {
      topic_id : this.state.topic_id
    });
  }

  fetchQuestions = async () => {
    const { page } = this.state;
    this.setState({ loading : true });
    try {
      // const questionsData = await getQuestionByTopicAsync('travel', page);
      const questionsData = await this.props.dispatch(getQuestions(this.state.topic_id, page));
      // console.log(questionsData)
      // getQuestions
      this.setState({
        data : this.state.data.concat(questionsData),
        loading : false
      });
      // console.log(this.state.data)
    } catch(error) {
      this.setState({ error, loading : false });
    }
  }

  componentDidMount() {
    // const { page } = this.state;
    // const { dispatch, navigation } = this.props;
    // const topic_id = navigation.getParam('id');
    // dispatch(getQuestions(topic_id, page)).then(result => {
    //   this.setState({
    //     data : result
    //   });
    // });
    this.props.navigation.setParams({
      _onPressOpenEditScreenButton : this._onPressOpenEditScreenButton,
      _onPressOpenNewWordScreenButton : this._onPressOpenNewWordScreenButton
    });
    this.fetchQuestions(); // using WP API (not used anymore)
  }

  // static getDerivedStateFromProps (props, state) {
  //   if (!state.data)
  //     return {
  //       data : getQuestionByTopic('friends')
  //     }
  // }

  // onClickQuestion = () => {
  //   console.log(this.props.navigation);
  //   this.props.navigation.navigate('AnswerQuestionScreen', item);
  // }

  handleOnNavigateBack = (data) => {
    this.setState({
      data : this.state.data.map((question) => {
        // console.log( question );
        if (question.id === data.id) {
          question.totalAnswer = data.totalAnswer;
          question.answer = data.answer;
        }
        return question;
      })
    });
  }

  renderItem = ({item}) => {
    item.topic_id = this.state.topic_id;
    item.onNavigateBack = this.handleOnNavigateBack;
    // item.page = this.state.page;
    return (
      <TouchableHighlight onPress={() => {
        this.props.navigation.navigate('AnswerQuestionScreen', item);
      }}>
        <View style={styles.questionItem}>
          <Text style={styles.questionItemTitle}>{item.title}</Text>
          <Text style={styles.questionItemAnswerTitle}>{item.totalAnswer} Answers</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderHeader = () => {
    return (
      <TopTitle/>
    );
  }

  renderFooter = () => {
    return (this.state.loading &&
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  /* TODO: Custom question item like this  */
  // _renderRowView(rowData) {
  //   return (
  //     <TouchableHighlight
  //       style={styles.row}
  //       underlayColor='#c8c7cc'
  //       onPress={() => this._onPress(rowData)}
  //     >
  //       <Text>{rowData}</Text>
  //     </TouchableHighlight>
  //   );
  // }

  /**
   * - set new page of this.state
   * - call func get data after set.
   */
  handleLoadMore = () => {
    this.setState({ loading : true, page : this.state.page + 1 }, () => {
      this.fetchQuestions();
    });
  }

  render() {
    // const { questions } = this.props;
    // console.log(this.props.questions);
    // console.log('Jack check');
    // console.log(questions[this.state.topic_id]);

    return (
      <Container>
        <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => uuid()}
            onEndReachedThreshold={0.7}
            onEndReached={this.handleLoadMore}
            ListFooterComponent={this.renderFooter}
          />
      </Container>
    );
  }
}

const mapStateToProps = state => state.question;

export default connect(mapStateToProps)(QuestionScreen);
