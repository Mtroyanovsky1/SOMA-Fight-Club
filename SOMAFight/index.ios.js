/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableOpacity,
  Image
} from 'react-native';

var mainMenu = React.createClass({
  setInitialState() {

  },
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
          <Text style={[styles.headerText]}>Welcome to</Text>
          <Text style={[styles.headerText]}>the fight</Text>
        </View>
        <TouchableOpacity onPress={() => this.props.navigator.push({title: "Battle", component: Lobby})} style={[styles.button, styles.buttonPurple]}>
          <Text style={[styles.buttonText]}>BATTLE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigator.push({title: "Leadership", component: Leadership})} style={[styles.button, styles.buttonGreen]}>
          <Text style={[styles.buttonText]}>LEADERSHIP</Text>
        </TouchableOpacity>
      </View>
    )
  }
})

var Battle = React.createClass({
  setInitialState() {
    return {

    }
  },
  render() {
    return (
      <View style={[styles.battleOutline]}>
        <Image source={require("./finaldestination.jpg")}
        resizeMode = "stretch"
        style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'flex-end'}}>
        <View style={[styles.battleCharacterView]} >
          <View style={[styles.yourChar]}>
            <TouchableOpacity onPress={() => this.props.navigator.pop(0)} style={[styles.button]}>
              <Text style={[styles.buttonText]}>Main Menu</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.otherChar]}>
            <TouchableOpacity onPress={() => console.log('hot')} style={[styles.button]}>
              <Text style={[styles.buttonText]}>Main Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Image>
        <View style={[styles.battleStatusView]}>
          <TouchableOpacity onPress={() => console.log('final move')} style={[styles.statusView]}>
            <View style={[styles.finalMoveView]}>
              <Text>Final Move</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('card!')} style={[styles.statusView]}>
            <View style={[styles.cardView]}>
              <Text>Card</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('health')} style={[styles.statusView]}>
            <View style={[styles.healthView]}>
              <Text>Health</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
})

var Lobby = React.createClass({
  getInitialState() {
    return {
      users: [{name: 'Daniel', ranking: 2}, {name: 'Yum', ranking: 3}, {name: 'Yak', ranking: 2}]
    };
  },
  render() {
    console.log(this.state.users);
    return (
      <View style={[styles.userList]}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          Go fight someone!
        </Text>
        {this.state.users.map((user) =>
          <TouchableOpacity onPress={() => console.log('user')} style={[styles.button, styles.buttonPurple]}>
            <Text>{user.name} #{user.ranking}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => this.props.navigator.push({title: "Battle", component: Battle})} style={[styles.button, styles.buttonPurple]}>
          <Text>
            BATTLE
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
})

var Leadership = React.createClass({
  render() {
    return (
      <Text>Leadership</Text>
    )
  }
})

var SOMAFight = new React.createClass( {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: mainMenu,
          title: "mainMenu"
        }}
        style={{flex: 1}}
        navigationBarHidden={true}
      />
    );
  }
})



const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 5
  },
  buttonPurple: {
    backgroundColor: '#AF2A5F'
  },
  buttonGreen: {
    backgroundColor: '#2D8E7A'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  headerText: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 40,
  },
  battleOutline: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  battleCharacterView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  yourChar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  otherChar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  battleStatusView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1
  },
  statusView: {
    flex: 1,
  },
  finalMoveView: {
    backgroundColor: 'yellow',
  },
  cardView: {
    backgroundColor: 'red',
  },
  healthView: {
    backgroundColor: 'blue',
  },
  userList: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('SOMAFight', () => SOMAFight);
