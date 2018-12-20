import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
// import GiftedListView from 'react-native-gifted-listview';
import GiftedListView from '../components/GiftedListView/GiftedListView';

class ListExample extends Component {

  state = {
    topStoryIDs : [],
    lastIndex : 0
  }

  // ------------------------------
  // Fetch data
  // callback(rowsData); => list Data
  listViewOnRefresh = (page, callback, api) => {
    // Check page 1.
    if (page != 1 && this.state.topStoryIDs) {
      // TODO: fetch data for the nex time.

    } else {
      // Fetch data for the first time.
      fetch(api)
      .then(response => response.json())
      .then(result => {
        const questionArray = result.map((question) => ({
          id : question.id,
          title : question.title.rendered,
          totalAnswer : 5
        }));
        callback(questionArray);
      })
      .catch(error => console.log(error))
    }

    // Check next Page.
    // 
  }
  // ----------------------------------------------------------


  _onFetch = (page = 1, callback, options) => {
    let api = 'https://connectenglishlearner.000webhostapp.com/wp-json/wp/v2/question?filter[topic]=travelling';
    this.listViewOnRefresh(page, callback, api);
  }

  _renderRowView(rowData) {
    return (
      <TouchableHighlight
        style={styles.row}
        underlayColor='#c8c7cc'
        onPress={() => {
          // this._onPress(rowData)
          console.log(rowData);
        }}
      >
        <Text>{rowData.title}</Text>
      </TouchableHighlight>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar} />
        {/* <GiftedListView
          rowView={this._renderRowView}
          onFetch={this._onFetch}
          firstLoader={true} // display a loader for the first fetching
          pagination={true} // enable infinite scrolling using touch to load more
          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          withSections={false} // enable sections
          customStyles={{
            paginationView: {
              backgroundColor: '#eee',
            },
          }}

          refreshableTintColor="blue"
        /> */}
    </View>
    );
  }
}

export default ListExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  navBar: {
    height: 64,
    backgroundColor: '#CCC'
  },
  row: {
    padding: 10,
    height: 44,
  }
});