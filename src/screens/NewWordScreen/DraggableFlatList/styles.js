import {Dimensions, StyleSheet} from 'react-native'

const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;
const numColumns = 2;

const styles = StyleSheet.create({
  FlatList : {
    margin : 0
  },
  ListItem : {
    width: (SCREEN_WIDTH - 17 * 2) / numColumns,
    margin : 0,
    padding : 0,
    marginLeft : 0
  }
});

export default styles;
