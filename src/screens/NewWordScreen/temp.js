import React, { Component } from 'react';
import { Text, View,StyleSheet,Image,TextInput,ListView} from 'react-native';

class AddWords extends Component{

  state = {words:['iku','konkai','kaikan'],
    word:'',
    EnglishWords:['go','this time','next time']
  }

  renderList(tasks){
    return(
      tasks.map((task) =>{
        return(
          <View key={task} style={styles.item}>
            <Text>
              {task}
            </Text>
            <Text>
            </Text>
          </View>
        )

      })

    )
  }
  renderEnglishWords(english){
    return(
      english.map((english) =>{
        return(
          <View key={english} style={styles.item2}>
            <Text>
              {english}
            </Text>
            <Text>
            </Text>
          </View>
        )

      })

    )
  }
  addWord(){
    let words = this.state.words.concat([this.state.word]);
    this.setState({words})


  }
  render(){
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(word) => {
            this.setState({word})
          }}
          onEndEditing={()=>this.addWord()}
        />

        <View style={{
          flexDirection : 'row',
          flex : 1
        }}>
          <View style={styles.wordContainer}>
            {this.renderList(this.state.words)}
          </View>
          <View style={styles.item2}>
            {this.renderEnglishWords(this.state.EnglishWords)}
          </View>
        </View>


      </View>

    )
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    borderWidth:3,
    borderColor:'green',
    flexDirection:'column',
    paddingTop:10

  },
  wordContainer:{

    flexDirection: 'column',
    borderColor:'blue',
    borderWidth:2


  },
  input:{
    height:60,
    borderWidth:1,
    borderRadius:5,
    borderColor:'black',
    textAlign:'center',
    margin:10,
    paddingTop:20,
    paddingBottom:10

  },
  item:{
    borderColor:'red',
    borderWidth:2


  },
  item2:{
    borderColor:'black',
    borderWidth:2,
    flexDirection:'column',
  }
})
export default AddWords;
