import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container : {
    paddingTop : 20
  },
  outerContainerStyles : {
    padding : 0,
    margin : 0,
    backgroundColor: 'transparent'
  },
  innerContainerStyles : {
    justifyContent: 'space-around'
  },
  row : {
    padding : 10,
    flexDirection : 'row',
    alignItems: 'center'
  },
  starNote : {
    alignSelf : 'center',
    padding : 8,
    backgroundColor : 'red',
    borderRadius : 5,
    marginRight : 10
  },
  title : {
    // backgroundColor : 'green',
    letterSpacing : 1.5
  },
  questionItem : {
    borderTopColor : '#e4e5e7',
    borderTopWidth : 1,
    padding : 10,
    // backgroundColor : 'green'
  },
  questionItemTitle : {
    fontSize : 20,
    fontWeight : 'bold',
    color : '#202124'
  },
  questionItemAnswerTitle : {
    fontWeight : '700',
    color : '#5f6368'
  }
});

export default styles;