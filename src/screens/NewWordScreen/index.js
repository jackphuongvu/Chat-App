import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, StatusBar, ScrollView } from 'react-native';

// import ListView from './ListView'
import ListView from './DraggableFlatList'
import Example from "./Example";
// import ListView from './NewListView'
// import AddWords from './temp'
// import UselessTextInput from './InputAccessoryView'

class NewWordScreen extends Component {

  state = {
    topic_id : this.props.navigation.getParam('topic_id')
  }

  // Update New Word Screen
  render() {
    return (
      <View style={{
        flex : 1,
        // backgroundColor : 'green'
      }}>
        {/*<ListView topic_id={this.state.topic_id} />*/}
        <ListView topic_id={this.state.topic_id} />
        {/*<UselessTextInput/>*/}

        {/*<Example/>*/}
        {/*<AddWords/>*/}
      </View>
    );
  }
}

export default NewWordScreen;

/**
 1. Text input to add new words with Auto complete search.
 2. Checkbox to add all the Topics or not.
 2.1. Uncheck => open List Topic screen to check What topics they want to save.
 3.

 */
