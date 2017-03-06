/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  NavigatorIOS,
  ListView,
  Animated,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

var loggedInUser = {}


var Login = React.createClass({

  getInitialState() {
    return {
    username: "",
    password: ""
    }
  },
  register() {
    this.props.navigator.push({
      component: Register,
      title: "Register"
    });
  },
  main() {
    this.props.navigator.push({
      component: mainMenu,
      title: "mainMenu"
    });
  },
  login() {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then((res) => res.json())
    .then((responseJson) => {
      if (responseJson) {
        loggedInUser = responseJson.user;
        this.props.navigator.push({
          component: mainMenu,
          title: "mainMenu"
        })
      } else {
        alert('error');
      }
    })
    .catch((err) => {
      alert(err);
    })
  },
  render() {
    return (
      <Image source={require("./images/rickfight.png")}
      resizeMode = "stretch"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'flex-start'}}>
      <View style={{width:310, height:175, margin:10}}>
        <View style={{flex:1, borderColor:'#d3d3d3'}}>

          <TextInput
          placeholder = "USERNAME"
          placeholderTextColor = "white"
          style = {styles.textInput}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
          />
        </View>
        <View style={{flex:1, borderColor:'#d3d3d3'}}>

          <TextInput
          placeholder = "PASSWORD"
          placeholderTextColor = "white"
          style = {styles.textInput}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          />

        </View>
      <TouchableOpacity onPress={this.register}
      style={{backgroundColor:'#AF2A5F', flex:1, justifyContent:'center', opacity: 0.8, alignItems:'center'}}>
      <Text style={{color:'#fff', fontSize:12, fontWeight:'700'}}>REGISTER</Text></TouchableOpacity>
      <TouchableOpacity onPress={this.login}
      style={{backgroundColor:'#AF2A5F', flex:1, justifyContent:'center', opacity: 0.8, alignItems:'center'}}>
      <Text style={{color:'#fff', fontSize:12, fontWeight:'700'}}>LOG IN</Text></TouchableOpacity>
      </View>
      </Image>
    );
  }
});


var Register = React.createClass({

  getInitialState() {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: ""
    }
  },
  register() {
      fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        })
      })
      .then((res) => res.json())
      .then((responseJson) => {
        if (responseJson.success) {
          this.props.navigator.push({
            component: Login,
            title: "Login"
          })
        } else {
          console.log('error');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  },
  render() {
    return (
      <Image source={require("./images/fight2.jpg")}
      resizeMode = "stretch"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      <View style={{width:310, height:175, margin:10}}>
      <View style={{flex:1, borderColor:'#d3d3d3'}}>
      <TextInput
      placeholder = "FIRST NAME"
      placeholderTextColor = "white"
      style = {styles.textInput}
      onChangeText={(text) => this.setState({firstname: text})}
      value={this.state.firstname}
      />
      </View>
      <View style={{flex:1, borderColor:'#d3d3d3'}}>
      <TextInput
      placeholder = "LAST NAME"
      placeholderTextColor = "white"
      style = {styles.textInput}
      onChangeText={(text) => this.setState({lastname: text})}
      value={this.state.lastname}
      />
      </View>
      <View style={{flex:1, borderColor:'#d3d3d3'}}>
      <TextInput
      placeholder = "USERNAME"
      placeholderTextColor = "white"
      style = {styles.textInput}
      onChangeText={(text) => this.setState({username: text})}
      value={this.state.username}
      />
      </View>
      <View style={{flex:1, borderColor:'#d3d3d3'}}>
      <TextInput
      placeholder = "PASSWORD"
      placeholderTextColor = "white"
      style = {styles.textInput}
      onChangeText={(text) => this.setState({password: text})}
      value={this.state.password}
      />
      </View>
      <TouchableOpacity onPress={this.register}
      style={{backgroundColor:'#20B0E8', flex:1, justifyContent:'center', alignItems:'center', opacity: 0.8}}>
      <Text style={{color:'#fff', fontSize:12, fontWeight:'700'}}>REGISTER</Text></TouchableOpacity>
      </View>
      </Image>
    );
}
});

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
});

var Lobby = React.createClass({
  getInitialState() {
    fetch('http://localhost:8080/challengers')
    .then((res) => res.json())
    .then((responseJson) => {
      if (responseJson) {
        this.setState({
          users: responseJson.users
        })
      } else {
        console.log('error');
      }
    })
    .catch((err) => {
      console.log(err);
    })
    return {
      users: []
    }
  },
  componentDidMount() {
    this.socket = SocketIOClient('http://localhost:8080');
    this.socket.on('battle', (user) => {
      var accept;
      var alertPromise = new Promise(function(resolve, reject) {
        Alert.alert(
          'Battle!!!',
          user.player1.username + ' has challenged you! Do you accept?',
          [
            {text: 'Yes', onPress: () => resolve(true)},
            {text: 'No', onPress: () => resolve(false)},
          ],
          { cancelable: false }
        )
      })
      alertPromise.then((accept) => {
        if (accept) {
          user.player2 = loggedInUser;
          this.socket.emit('acceptMatch', user);
          this.props.navigator.push({title: "CharacterBio", component: characterBio, passProps: {game: user}});
        }
        // else {
        //   var declined = {
        //     accept: false,
        //     user: user,
        //     acceptee: loggedInUser
        //   }
        //   this.socket.emit('acceptMatch', declined);
        // }
      })
    })
    this.socket.on('acceptMatch', (user) => {
      if (loggedInUser.username === user.player1.username) {
          this.props.navigator.push({title: "CharacterBio", component: characterBio, passProps: {game: user}})
      }
    })
    // this.socket.emit('message', 'hi');
    // this.socket.on('message', (str) => {
    //   alert('lhoohohoho')
    // })
  },
  challenge() {
    this.socket.emit('challenge', {player1: loggedInUser})
  },
  render() {
    return (
      <View style={[styles.userList]}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          Go fight someone!
        </Text>
        {this.state.users.map((user) =>
          <TouchableOpacity style={[styles.button, styles.buttonPurple]}>
            <Text>{user.username} # of wins: {user.totalWins}</Text>
            </TouchableOpacity>
        )}
        <TouchableOpacity onPress={this.challenge} style={[styles.button, styles.buttonPurple]}>
          <Text>
            BATTLE
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
});


var landoDes = "";
var speakerDes = "";

var characterBio = React.createClass({
  getInitialState() {
    return {
      game: this.props.game
    }
  },
  characterOne(){
    this.props.navigator.push({
      component: characterOne,
      title: "Lando",
      passProps: {game: this.state.game}
    })
  },
  characterTwo(){
    this.props.navigator.push({
      component: characterTwo,
      title: "Speaker",
      passProps: {game: this.state.game}
    })
  },
  battle(){
    if (loggedInUser.username === this.state.game.player1.username) {
      this.state.game.player1char = "Lando";
    } else {
      this.state.game.player2char = "Lando"
    }
    if (this.state.game.player1char && this.state.game.player2char) {
      this.props.navigator.push({
        component: Battle,
        passProps: {game: this.state.game}
      })
    }
    this.socket.emit('character', this.state.game);
  },
  componentDidMount() {
    this.socket = SocketIOClient('http://localhost:8080');
    this.socket.on('character', (char) => {
      if (char.player1char && char.player2char) {
        this.props.navigator.push({
          component: Battle,
          passProps: {game: char}
        })
      } else {
        this.state.game = char;
      }
    })
  },
  render(){
    return (
      <View style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: '#3BC356'}}>
       <Image source={require("./images/lando.jpg")}
       resizeMode = "stretch"
       style={{flex:1, alignItems:'center', width:null, height:null}}/>
       </View>
       <View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={{flex: 1, backgroundColor: 'yellow', flexDirection: 'row'}}>
             <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold'}}>PLAY AS LANDO</Text></TouchableOpacity>
             <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold'}}>PLAY AS SPEAKER</Text></TouchableOpacity>
           </View>
         <View style={{flex: 2, backgroundColor: 'white'}}></View>
         <View style={{flex: 2, backgroundColor: 'white', border: '1px solid grey', padding: 5}}>
           <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5 }}>Special Move</Text>
           <Text style={{color: 'grey', }}>Deals 50 damage by dropping a massive cake on the opponent</Text>
         </View>
         <View style={{flex: 1, backgroundColor: 'orange'}}>
         <TouchableOpacity onPress={this.battle} style={{flex:1, flexDirection: 'column', backgroundColor: '#FF5D5D', justifyContent: 'center', alignItems: 'center'}}>
           <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>PLAY</Text>
         </TouchableOpacity>
         </View>
       </View>
      </View>
    )
  }
});

var characterOne = React.createClass({
  getInitialState() {
    return {
      game: this.props.game
    }
  },
  characterOne(){
    this.props.navigator.push({
      component: characterOne,
      title: "Lando",
      passProps: {game: this.state.game}
    })
  },
  characterTwo(){
    this.props.navigator.push({
      component: characterTwo,
      title: "Speaker",
      passProps: {game: this.state.game}
    })
  },
  battle(){
    if (loggedInUser.username === this.state.game.player1.username) {
      this.state.game.player1char = "Lando";
    } else {
      this.state.game.player2char = "Lando"
    }
    if (this.state.game.player1char && this.state.game.player2char) {
      this.props.navigator.push({
        component: Battle,
        passProps: {game: this.state.game}
      })
    }
    this.socket.emit('character', this.state.game);
  },
  componentDidMount() {
    this.socket = SocketIOClient('http://localhost:8080');
    this.socket.on('character', (char) => {
      if (char.player1char && char.player2char) {
        this.props.navigator.push({
          component: Battle,
          passProps: {game: char}
        })
      } else {
        this.state.game = char;
      }
    })
  },
  render(){
    return (
      <View style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: 'grey'}}>
       <Image source={require("./images/lando.jpg")}
       resizeMode = "stretch"
       style={{flex:1, alignItems:'center', width:null, height:null}}/>
       </View>
       <View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={{flex: 1, backgroundColor: 'yellow', flexDirection: 'row'}}>
             <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold'}}>PLAY AS LANDO</Text></TouchableOpacity>
             <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold'}}>PLAY AS SPEAKER</Text></TouchableOpacity>
           </View>
         <View style={{flex: 2, backgroundColor: 'white'}}></View>
         <View style={{flex: 2, backgroundColor: 'white', border: '1px solid grey', padding: 5}}>
           <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5 }}>Special Move</Text>
           <Text style={{color: 'grey', }}>Deals 50 damage by dropping a massive cake on the opponent</Text>
         </View>
         <View style={{flex: 1, backgroundColor: 'orange'}}>
         <TouchableOpacity onPress={this.battle} style={{flex:1, flexDirection: 'column', backgroundColor: '#FF5D5D', justifyContent: 'center', alignItems: 'center'}}>
           <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>PLAY</Text>
         </TouchableOpacity>
         </View>
       </View>
      </View>
    )
  }
});

var characterTwo = React.createClass({
  getInitialState() {
    return {
      game: this.props.game
    }
  },
  characterOne(){
    this.props.navigator.push({
      component: characterOne,
      title: "Lando",
      passProps: {game: this.state.game}
    })
  },
  characterTwo(){
    this.props.navigator.push({
      component: characterTwo,
      title: "Speaker",
      passProps: {game: this.state.game}
    })
  },
  battle(){
    if (loggedInUser.username === this.state.game.player1.username) {
      this.state.game.player1char = "Speaker";
    } else {
      this.state.game.player2char = "Speaker"
    }
    if (this.state.game.player1char && this.state.game.player2char) {
      this.props.navigator.push({
        component: Battle,
        passProps: {game: this.state.game}
      })
    }
    this.socket.emit('character', this.state.game);
  },
  componentDidMount() {
    this.socket = SocketIOClient('http://localhost:8080');
    this.socket.on('character', (char) => {
      if (char.player1char && char.player2char) {
        this.props.navigator.push({
          component: Battle,
          passProps: {game: char}
        })
      } else {
        this.state.game = char;
      }
    })
  },
  render(){
    return (
      <View style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: 'white'}}>
       <Image source={require("./images/speaker.jpg")}
       resizeMode = "stretch"
       style={{flex:1, alignItems:'center', width:null, height:null}}/>
       </View>
       <View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={{flex: 1, backgroundColor: 'yellow', flexDirection: 'row'}}>
             <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: 'red', color: 'white', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold'}}>PLAY AS LANDO</Text></TouchableOpacity>
             <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: 'blue', color: 'white', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold'}}>PLAY AS SPEAKER</Text></TouchableOpacity>
           </View>
         <View style={{flex: 2, backgroundColor: 'white'}}></View>
         <View style={{flex: 2, backgroundColor: 'white', border: '1px solid grey', padding: 5}}>
           <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5 }}>Special Move</Text>
           <Text style={{color: 'grey', }}>Deals 50 damage by dropping a massive cake on the opponent</Text>
         </View>
         <View style={{flex: 1, backgroundColor: 'orange'}}>
         <TouchableOpacity onPress={this.battle} style={{flex:1, flexDirection: 'column', backgroundColor: '#FF5D5D', justifyContent: 'center', alignItems: 'center'}}>
           <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>PLAY</Text>
         </TouchableOpacity>
         </View>
       </View>
      </View>
    )
  }
});

var Battle = React.createClass({
  setInitialState() {
    return {
    }
  },
  componentDidMount() {
    alert(this.props.game + "the game");
  },
  render() {
    return (
      <View style={[styles.battleOutline]}>
        <Image source={require("./finaldestination.jpg")}
        resizeMode = "stretch"
        style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'flex-end'}}>
        <View style={[styles.battleCharacterView]} >
          <Text>{this.props.game.player1.username}</Text>
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



var Leadership = React.createClass({
  getInitialState() {
    return {
      users: [{name: 'Daniel', ranking: 2}, {name: 'Yum', ranking: 3}, {name: 'Yak', ranking: 2}]
    };
  },
  render() {
    return (
      <View>
      {this.state.users.map((user) =>
        <TouchableOpacity onPress={() => this.props.navigator.push({title: "Lobby", component: Lobby})} style={[styles.button, styles.buttonPurple]}>
          <Text>{user.name} #{user.ranking}</Text>
        </TouchableOpacity>
      )}
      </View>
    )
  }
})

var SOMAFight = new React.createClass( {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Login,
          title: "Login"
        }}
        style={{flex: 1}}
        navigationBarHidden={true}
      />
    );
  }
});





const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: null, height: null, backgroundColor: 'white',paddingBottom: 20},
  textInput: {flex:1, backgroundColor:'black', padding:5, color:'#fff', fontSize:12, opacity: 0.8},
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
