import React, { Component } from 'react';
import {TextInput, FlatList, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Right, Icon,
  Button, CheckBox, Body
} from 'native-base';
import Collapsible from 'react-native-collapsible';
import DraggableFlatList from 'react-native-draggable-flatlist';
import uuid from 'uuidv4';

import {addNewWord, getWords, removeWordFromNote, updateIndexTopic} from "../../../actions/note";
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

const word = ({ id, key, name, index}) => ({
  key : `item-${index}`,
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
    data : [],
    todoListTemp : [...Array(20)].map((d, index) => ({
      key: `item-${index}`,
      label: index,
      backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
    }))
    //
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
                // topic_id : topic_id
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

  /*
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
  */

  // Custom this function to renderItem.
  renderItem = ({item, index, move, moveEnd, isActive}) => {
    return (
      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: isActive ? 'blue' : item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          // alignSelf: 'stretch',
        }}
        onLongPress={move}
        onPressOut={moveEnd}
      >

        {/*<View style={{*/}
          {/*flex : 1,*/}
          {/*flexDirection : 'row',*/}
          {/*// backgroundColor : 'red'*/}
        {/*}}>*/}
          {/*<Text style={{*/}
            {/*fontWeight: 'bold',*/}
            {/*color: 'white',*/}
            {/*fontSize: 32,*/}
            {/*// backgroundColor : 'green'*/}
          {/*}}>{item.name}</Text>*/}
          {/*<Button light*/}
                  {/*onPress={() => this.onPressDelete(item.id)}*/}
          {/*><Text>Delete</Text></Button>*/}
        {/*</View>*/}

        {/*<ListItem style={{*/}
          {/*flex : 1,*/}
          {/*// flexDirection : 'row',*/}
          {/*// backgroundColor : 'red'*/}
        {/*}}>*/}

        <View style={{
          flexDirection : 'row',
          backgroundColor : 'blue',
          padding : 10
        }}>
          <Left>
            <Text style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 32,
              // backgroundColor : 'green'
            }}>{item.name}</Text>
          </Left>
          <Right>
            <Button light
                    onPress={() => this.onPressDelete(item.id)}
            ><Text>Delete</Text></Button>
          </Right>
        {/*</ListItem>*/}
        </View>

      </TouchableOpacity>
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

  fetchNewWords = () => {
    const { dispatch, topic_id } = this.props;
    dispatch(getWords(topic_id)).then((words) => {
      this.setState({
        todoList : words.map((item) => {
          return {
            key: `item-${item.index}`,
            id : item.word_id,
            name : item.name,
            index : item.index,
            topic_id : topic_id
          }
        })
      });
    })
  }

  setTopics = () => {
    const { topic_id } = this.props;
    this.setState({
      topicCheckedList : [topic_id],
      data : this.props.topics
    });
  }

  componentWillMount() {
    this.fetchNewWords();
    this.setTopics();
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
        {/*<Content>*/}

          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={this.onSubmitEditing}
          />

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

          <DraggableFlatList
            data={this.state.todoList}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            scrollPercent={5}
            onMoveEnd={({ data }) => {
              this.setState({ todoList : data})

              const {dispatch, topic_id} = this.props;
              dispatch(updateIndexTopic(topic_id, data.map((word) => {
                return word.id;
              }).join(','))).then(() => {

                DropDownHolder.getDropDown().alertWithType('success', 'Success', 'Update Successfully!');
                console.log ('updateIndexTopic inside FlatList')
              });
            }}
          />

        {/*</Content>*/}
      </Container>
    );
  }

}

/**
  <View style={{
        flex : 1
      }}>
 </View>
 * @param state
 */

const mapStateToProps = state => state.question;

export default connect(mapStateToProps)(ListView);
