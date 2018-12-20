import React, { Component } from 'react'
import { FlatList, Text } from 'react-native'
import { List, ListItem, Icon } from 'react-native-elements'
import uuid from 'uuidv4'
import { connect } from 'react-redux'

import { signOut } from '../../../actions/user'

class Settings extends Component {
  state = {
    list : [
      {
        name: 'Log Out',
        // avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        // subtitle: 'Vice President',
        icon: 'logout',
        onPress : () => {
          this.props.dispatch(signOut()).then(() => {
            this.props.navigation.navigate('AuthLoadingScreen');
          })

        }
      },
    ]
  }
  renderItem = ({ item }) => {
    // console.log(item)
    // return <UserItem item={item} />;
    return <ListItem
            // roundAvatar
            // avatar={{uri:item.avatar_url}}
            // key={item.name}
            title={item.name}
            // leftIcon={item.icon}
            leftIcon={<Icon type='material-community' name={item.icon} size={40} style={{
              backgroundColor : 'red',
              marginRight : 40,
              paddingRight : 40
            }} />}
            hideChevron={true}
            onPress={item.onPress}
            containerStyle={{
              backgroundColor : '#f5f6f7'
            }}
          />
  };

  render() {
    return (
      <List>
        <FlatList
          data={this.state.list}
          renderItem={this.renderItem}
          keyExtractor={() => uuid()}
        />
      </List>
    );
  }
}

// export default Settings
export default connect()(Settings)
