import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  error : state.auth.error
})

const Alert = ({error}) => {
  // if (error = )
  return (
    <View style={styles.container}>
      <Text>{error}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container : {
    paddingLeft: 40,
    paddingRight: 40,
  }
});

export default connect(mapStateToProps)(Alert);
