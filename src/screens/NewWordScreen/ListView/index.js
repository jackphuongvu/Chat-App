import React, { Component } from 'react';
import { TextInput, FlatList, View, Text, Dimensions } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Right, Icon,
  Button, CheckBox, Body
} from 'native-base';
import Collapsible from 'react-native-collapsible';
import uuid from 'uuidv4';

import { addNewWord, getWords, removeWordFromNote} from "../../../actions/note";
import { connect } from 'react-redux'

import styles from './styles'
import {DropDownHolder} from "../../../config";
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;
const numColumns = 2;
/**
 * 1. name
 * 2. description
 * 3.
 */
const task = (title) => ({
  id : uuid(),
  title : title,
  checked : false
});

const word = ({ id, name, index}) => ({
  // id : uuid(),
  id : id,
  name : name, // string
  index : index, // int
  // topic_id : topic_id // int ( 1 Topic)
});

class ListView extends Component {
  state = {
    checkAllTopics : false,
    isOpenTopicSettings : false,
    text : '',
    todoList : [],
    topicCheckedList : [],
    data : []
  }

  onSubmitEditing = () => {
    const val = this.state.text;
    /* Add new To do task to the List */
    // this.setState({
    //   todoList : [
    //     ...this.state.todoList,
    //     task(val)
    //   ]
    // }, () => {
    //   // TODO: Add API
    //
    // });

    // TODO:
    // - add new word => Almost done until now.
    const { dispatch, topic_id } = this.props;
    dispatch(addNewWord(val, this.state.topicCheckedList.join(','), topic_id))
      .then((result) => {
        // Check result
        if (result.message) {
          DropDownHolder.getDropDown().alertWithType('warn', 'Warning', result.message);
        } else
          this.setState({
            todoList : [
              ...this.state.todoList,
              word({
                id : result.id,
                name : result.name,
                index : result.index,
                topic_id : topic_id
              })
            ]
          })
      })
      .catch()
  }

  // current_topic_id
  onPressDelete = (wordId) => {
    console.log('wordId' + wordId)
    // TODO: We need ID to delete one Task
    // Make action to delete this note.
    // We can use filter from Array for this Working.
    const { dispatch, topic_id } = this.props;
    // (word_id, topic_id)
    // current_index
    dispatch(removeWordFromNote(wordId, topic_id)).then((result) => {
      if (result) {
        console.log(result)
        this.setState({
          todoList : this.state.todoList.filter((item) => {
            return item.id !== wordId;
          })
        });
        // Update index again.
      } // == true => Remove successfully!
      else {
        // There is something wrong here!
      }
      console.log(result)
      // Just check box for current Topic.
    });
  }

  renderItem = ({item}) => {
    return (
      <ListItem noIndent style={{ backgroundColor: "#cde1f9" }}>
        <Left>
          <Text>{item.name}</Text>
        </Left>
        <Right>
          <Button light
                  onPress={() => this.onPressDelete(item.id)}
          ><Text>Delete</Text></Button>
        </Right>
      </ListItem>
    );
  }

  onTopicClick = (item) => {
    if (this.state.topicCheckedList.includes(item.id)) {
      let topicCheckedList = this.state.topicCheckedList;
      topicCheckedList.splice( topicCheckedList.indexOf( item.id ), 1 );
      this.setState({
        topicCheckedList : topicCheckedList
      });
    } else {
      this.setState({
        topicCheckedList : [
          ...this.state.topicCheckedList,
          item.id
        ]
      });
    }
  }

  componentWillMount() {
    // console.log('JACK CHECK topic_id')
    // topic_id = this.props.navigation.getParams('topic_id');
    //
    // console.log( this.props )
    const { dispatch, topic_id } = this.props;
    // get current Topic right now.
    // current_topic_id
    // console.log( this.props );
    dispatch(getWords(topic_id)).then((words) => {
      // console.log( words )
      // TODO:
      // - Update list of new words right here.
      // console.log(words)
      this.setState({
        todoList : words.map((item) => {
          return {
            id : item.word_id,
            name : item.name,
            index : item.index,
            topic_id : topic_id
          }
        })
      });
    })

    // Update just
    this.setState({
      // topicCheckedList : this.props.topics.map((topic) => {
      //   return topic.id;
      // }),
      //
      topicCheckedList : [topic_id],
      data : this.props.topics
      // Update new words right here (getWords)
    });
  }

  renderListTopicWithFlatList = () => {
    return (
      <FlatList
        style={styles.FlatList}
        horizontal={false}
        numColumns={2}
        data={this.props.topics}
        extraData={this.state}
        renderItem={({item}) => {
          const topic = item;
          return (
            <ListItem
              style={styles.ListItem}
              key={topic.id}>
              <CheckBox checked={this.state.topicCheckedList.includes(topic.id)}
                        onPress={() => {
                          this.onTopicClick(topic)
                        }}/>
              <Body>
                <Text>{topic.title}</Text>
              </Body>
            </ListItem>
          )
        }}
        keyExtractor={() => uuid()}
      />
    );
  }

  render() {
    return (
      <Container style={{
        flex : 1
      }}>
        {/*<Header/>*/}
        <Content>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={this.onSubmitEditing}
          />
          {/*<Button onPress={() => {*/}
          {/*// add new Item to the List new words*/}
          {/*}}>*/}
          {/*</Button>*/}
          {/*Settings Topic*/}
          <View>
            <ListItem>
              <CheckBox checked={this.state.checkAllTopics}
                        onPress={() => {
                          this.setState({
                            checkAllTopics : !this.state.checkAllTopics,
                          });
                        }}
              />
              <Body>
              <Text>All Topics</Text>
              </Body>
            </ListItem>
            <Collapsible collapsed={this.state.checkAllTopics}
                         style={{
                           // backgroundColor : 'yellow',
                           // padding : 17,
                           paddingLeft : 17,
                           paddingRight : 17,
                         }}>
              {this.renderListTopicWithFlatList()}
            </Collapsible>
          </View>
          <FlatList
            data={this.state.todoList}
            renderItem={this.renderItem}
            keyExtractor={() => uuid()}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => state.question;

export default connect(mapStateToProps)(ListView);
