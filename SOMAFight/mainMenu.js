import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableOpacity
} from 'react-native';


const styles = StyleSheet.create({

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

var mainMenu = React.createClass({
  setInitialState() {

  }
  press() {
    this.props.navigator.push({
        component: Users,
        title: "Users",
        rightButtonTitle: 'Messages',
        onRightButtonPress: this.message
    })
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigator.push({title: "User"}) style={[styles.button]}>
          <Text>Battle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.press} style={[styles.button]}>
          <Text>Leadership</Text>
        </TouchableOpacity>
      </View>
    )
  }
})

export mainMenu;
