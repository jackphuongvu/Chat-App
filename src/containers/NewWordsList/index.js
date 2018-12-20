import {FlatList, InputAccessoryView, Text, View, Dimensions} from "react-native";
import React, { Component } from "react";

import { connect } from 'react-redux';
import {getWords} from "../../actions/note";
import uuid from 'uuidv4';

class NewWordsList extends Component {

  state = {
    newWords : []
  }

  fetchNewWords = () => {
    const { dispatch } = this.props;
    const topic_id = this.props.question.topic.id;
    dispatch(getWords(topic_id)).then((words) => {
      console.log(words)
      this.setState({ newWords : words });
      // this.setState({
      //   todoList : words.map((item) => {
      //     return {
      //       key: `item-${item.index}`,
      //       id : item.word_id,
      //       name : item.name,
      //       index : item.index,
      //       topic_id : topic_id
      //     }
      //   })
      // });
    })
  }

  componentWillMount() {
    this.fetchNewWords();
  }

  displayNewWords = () => {
    console.log( this.state.newWords )
    return (
      <FlatList
        data={this.state.newWords}
        renderItem={({item}) => {
          // Check Count of new words
          return (
            <Text style={{
              fontSize : 20,
              borderRadius : 5,
              backgroundColor : 'red',
              // fontWeight : 700,
              padding : 8,
              marginRight : 10,
              marginVertical : 10,
            }}>{item.name}</Text>
          )
        }}
        keyExtractor={() => uuid()}
        horizontal={true}
      />
    )
  }

  render () {
    const inputAccessoryViewID = "uniqueID";
    return (
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View style={{
          flex : 1,
          backgroundColor : 'white',
          width : Dimensions.get('window').width,
          margin : 0,
          padding : 0
        }}>
          {this.displayNewWords()}
        </View>
      </InputAccessoryView>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NewWordsList);
