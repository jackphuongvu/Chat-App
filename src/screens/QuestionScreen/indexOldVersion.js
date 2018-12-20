import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import GiftedListView from 'react-native-gifted-listview';
// import RefreshableListView from 'react-native-refreshable-listview';
import { List, ListItem, Header } from 'react-native-elements';
import { ListItem as NBListItem, Left, Body, Icon as NBIcon, Right, Title } from "native-base";
import uuid from 'uuidv4';

import {getQuestionByTopic, getQuestionByTopicAsync} from '../../helper/functions';
import styles from './styles';

const TopTitle = () => {
  return (
    <View style={styles.row}>
      <View style={styles.starNote}>
        <FontAwesome name="star" size={20} color="white"/>
      </View>
      <Text style={styles.title}>QUESTIONS FOR YOU</Text>
    </View>
  );
}

// const api_endpoint = 'https://connectenglishlearner.000webhostapp.com/wp-json/wp/v2/question?filter[topic]=travelling&page=2';
// api_endpoint = 'https://randomuser.me/api/?page=3&results=20';

class QuestionScreen extends Component {

  state = {
    data : [],
    page : 1,
    loading : false,
    error : null
  }

  // TODO:
  // 1. check loading: success and Failing
  // - (with renderFooter): NOT DONE
  // 2. get data from API in page 1: DONE
  // 3. add Load more feature from FlatList

  fetchQuestions = async () => {
    const { page } = this.state;
    this.setState({ loading : true });
    try {
      const questionsData = await getQuestionByTopicAsync('travelling', page);
      this.setState({
        data : questionsData,
        loading : false
      });
    } catch(error) {
      this.setState({ error, loading : false });
    }
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  // static getDerivedStateFromProps (props, state) {
  //   if (!state.data)
  //     return {
  //       data : getQuestionByTopic('friends')
  //     }
  // }

  renderItem = ({item}) => {
    return (
      <View style={styles.questionItem}>
        <Text style={styles.questionItemTitle}>{item.title}</Text>
        <Text style={styles.questionItemAnswerTitle}>{item.totalAnswer} Answers</Text>
      </View>
    );
  }

  renderHeader = () => {
    return (
      <TopTitle/>
    );
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
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
    this.setState({ page : this.state.page + 1 }, () => {
      this.fetchQuestions();
    });
  }

  render() {
    return (
      <View>
        <Header
          centerComponent={<TopTitle/>}
          outerContainerStyles={styles.outerContainerStyles}
          innerContainerStyles={styles.innerContainerStyles}
        />
        {/* <List> */}
          <FlatList
            style={{
              // backgroundColor : 'red'
            }}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => uuid()}
            // onEndReachedThreshold={0.7}
            // onEndReached={this.handleLoadMore}
            // renderHeader
            // ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
          />
      {/* </List> */}
      </View>
    );
  }
}

export default QuestionScreen;
