import React, { Component } from 'react';
import {View, Text, TextInput, TouchableHighlight, FlatList} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';

import {sendParagraph, getParagraph, updateParagraph} from "../../actions/paragraph";
import { DropDownHolder } from '../../config'
import {getWords} from "../../actions/note";
import NewWordsList from "../../containers/NewWordsList";

class EditSpeechForTopicScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title : 'Create Writing',
    // headerTitle:
    //   <Body>
    //     <TopTitle/>
    //   </Body>,
    headerRight : (
      <TouchableHighlight
        // hasText bordered info
        style={{
          marginRight : 15
        }}
        onPress={navigation.state.params._onPressButton}
      >
        <Text style={{
          fontSize : 15
        }}>Submit</Text>
      </TouchableHighlight>
    )
  });

  state = {
    text : '',
    paragraph : null,
    newWords : []
  }

  _onPressButton = () => {
    const topic_id = this.props.navigation.getParam('topic_id');
    const { dispatch } = this.props;
    // console.log('topic_id inside EditSpeechForTopicScreen')
    // console.log( topic_id )
    if (this.state.paragraph) {
      dispatch(updateParagraph(this.state.paragraph.id, this.state.text))
        .then(() => {
          DropDownHolder.getDropDown().alertWithType('success', 'Success', 'Update Successfully!');
        });
    } else {
      dispatch(sendParagraph(this.state.text, topic_id)).then(result => {
        DropDownHolder.getDropDown().alertWithType('success', 'Success', 'Create Successfully!');
        this.setState({
          paragraph : result
        });
      });
    }
  }

  fetchNewWords = () => {
    // Update topic_id right here.
    // TODO
    const { dispatch, topic_id } = this.props;
    console.log(this.props)
    // console.log(topic_id)
    dispatch(getWords(topic_id)).then((words) => {
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

  fetchParagraph = () => {
    const topic_id = this.props.navigation.getParam('topic_id');
    this.props.dispatch(getParagraph(topic_id))
      .then(result => {
        if ( !_.isEmpty(result) ) {
          const text = result.text;
          this.setState({
            text,
            paragraph : result
          });
        }
      })
      .catch((error) => {
        console.log( error )
      });
  }

  // componentWillMount() {
  //   /** get new Words */
  //   this.fetchNewWords();
  // }

  componentDidMount () {
    this.props.navigation.setParams({
      _onPressButton : this._onPressButton
    });

    /** fetch Paragraphs */
    this.fetchParagraph();

    /** get new Words */
    this.fetchNewWords();
  }

  displayNewWords = () => {
    return (
      <FlatList
        data={this.state.newWords}
        renderItem={({item}) => {
          console.log(item)
          return (
            <Text style={{
              backgroundColor : 'white',
              // fontWeight : 700,
              fontSize : 20,
              padding : 10
            }}>Jack new word</Text>
          )
        }}
        keyExtractor={() => uuid()}
      />
    )
  }

  render() {
    const inputAccessoryViewID = "uniqueID";
    return (
      <View style={{
        flex : 1
        // borderWidth : 1
      }}>
        <TextInput
          style={{
            padding : 15,
            paddingTop : 15,
            fontSize : 20,
            borderWidth : 1
          }}
          multiline={true}
          numberOfLines={5}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='Write your writing'
          inputAccessoryViewID={inputAccessoryViewID}
        />
        <NewWordsList/>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(EditSpeechForTopicScreen);
