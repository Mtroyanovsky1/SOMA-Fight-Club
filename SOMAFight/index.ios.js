/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
global.__DEV__=false;
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
  Alert,
  Easing
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
      var alertPromise = new Promise(function(resolve, reject) {
        return Alert.alert(
          'Battle!!!',
          user + ' has challenged you! Do you accept?',
          [
            {text: 'Yes', onPress: () => accept = true},
            {text: 'No', onPress: () => accept = false},
          ],
          { cancelable: false }
        )
      })
      alertPromise.then((accept) => {
        alert('hiii')
        if (accept) {
          alert("accepted");
          var accepted = {
            accept: true,
            user: loggedInUser
          }
          this.props.navigator.push({title: "Battle", component: CharacterBio})
          this.socket.emit('acceptMatch', accepted);
        } else {
          alert("not accepted");
          var declined = {
            accept: false,
            user: loggedInUser
          }
          this.socket.emit('acceptMatch', declined);
        }
      })
    })
    this.socket.on('acceptMatch', (user) => {
      if (loggedInUser.username === user) {
          this.props.navigator.push({title: "Battle", component: CharacterBio})
      }
    })
    // this.socket.emit('message', 'hi');
    // this.socket.on('message', (str) => {
    //   alert('lhoohohoho')
    // })
  },
  challenge() {
    this.socket.emit('challenge', {user: loggedInUser})
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
      game: this.props.game //This is an object with both players
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
        this.setState({
          game: char
        })
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
      <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: '#AF2A5F', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold', color: 'white'}}>PLAY AS LANDO</Text></TouchableOpacity>
      <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: '#2D8E7A', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold', color: 'white'}}>PLAY AS SPEAKER</Text></TouchableOpacity>
      </View>
      <View style={{flex: 2, backgroundColor: 'white', padding: 5}}>
      <View style={{flex:1}}>
      <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5, textAlign: 'center' }}>LANDO</Text>
      <Text style={{color: 'grey',textAlign: 'center' }}>I love long walks to the library.</Text>
      </View>
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
      <View style={{flex:1}}>
      <Text style={{color: 'grey', textAlign: 'center', fontWeight: 'bold'}}>Height {"\n"} 182cm</Text>
      </View>
      <View style={{flex:1}}>
      <Text style={{color: 'grey', textAlign: 'center', fontWeight: 'bold'}}>Weight {"\n"} 172lbs</Text>
      </View>
      <View style={{flex:1}}>
      <Text style={{color: 'grey', textAlign: 'center', fontWeight: 'bold'}}>Record {"\n"} 30-0</Text>
      </View>
      </View>
      </View>
      <View style={{flex: 2, backgroundColor: '#5F9EFF', border: '1px solid grey', flexDirection: 'row'}}>
      <TouchableOpacity className='ab2' style={{flex: 1, padding: 10, backgroundColor: 'none'}}>
      <Image source={require("./images/finalMoveBooks.png")}
      resizeMode = "contain"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      </Image>
      </TouchableOpacity>
      <TouchableOpacity className='ab2' style={{flex: 3, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
      <View>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'left'}}>Final Move</Text>
      <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'left'}}>A barrage of fiction and non-fiction books.</Text>
      </View>
      </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: '#FF573D', flexDirection: 'row'}}>
      <TouchableOpacity className='ab2' onPress={this.battle} style={{flex: 1, padding: 5, backgroundColor: 'none'}}>
      <Image source={require("./images/battle1.png")}
      resizeMode = "contain"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      </Image>
      </TouchableOpacity>
      <TouchableOpacity className='ab2' onPress={this.battle} style={{flex: 3, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
      <View>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>JOIN THE BATTLE</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity className='ab2' onPress={this.battle} style={{flex: 1, padding: 5, backgroundColor: 'none'}}>
      <Image source={require("./images/battle1.png")}
      resizeMode = "contain"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      </Image>
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
      <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: '#AF2A5F', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold', color: 'white'}}>PLAY AS LANDO</Text></TouchableOpacity>
      <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: '#2D8E7A', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold', color: 'white'}}>PLAY AS SPEAKER</Text></TouchableOpacity>
      </View>
      <View style={{flex: 2, backgroundColor: 'white', padding: 5}}>
      <View style={{flex:1}}>
      <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5, textAlign: 'center' }}>LANDO</Text>
      <Text style={{color: 'grey',textAlign: 'center' }}>I love long walks to the library.</Text>
      </View>
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
      <View style={{flex:1}}>
      <Text style={{color: 'grey', textAlign: 'center', fontWeight: 'bold'}}>Height {"\n"} 182cm</Text>
      </View>
      <View style={{flex:1}}>
      <Text style={{color: 'grey', textAlign: 'center', fontWeight: 'bold'}}>Weight {"\n"} 172lbs</Text>
      </View>
      <View style={{flex:1}}>
      <Text style={{color: 'grey', textAlign: 'center', fontWeight: 'bold'}}>Record {"\n"} 30-0</Text>
      </View>
      </View>
      </View>
      <View style={{flex: 2, backgroundColor: '#5F9EFF', border: '1px solid grey', flexDirection: 'row'}}>
      <TouchableOpacity className='ab2' style={{flex: 1, padding: 10, backgroundColor: 'none'}}>
      <Image source={require("./images/finalMoveBooks.png")}
      resizeMode = "contain"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      </Image>
      </TouchableOpacity>
      <TouchableOpacity className='ab2' style={{flex: 3, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
      <View>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'left'}}>Final Move</Text>
      <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'left'}}>A barrage of fiction and non-fiction books.</Text>
      </View>
      </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: '#FF573D', flexDirection: 'row'}}>
      <TouchableOpacity className='ab2' onPress={this.battle} style={{flex: 1, padding: 5, backgroundColor: 'none'}}>
      <Image source={require("./images/battle1.png")}
      resizeMode = "contain"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      </Image>
      </TouchableOpacity>
      <TouchableOpacity className='ab2' onPress={this.battle} style={{flex: 3, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
      <View>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>JOIN THE BATTLE</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity className='ab2' onPress={this.battle} style={{flex: 1, padding: 5, backgroundColor: 'none'}}>
      <Image source={require("./images/battle1.png")}
      resizeMode = "contain"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      </Image>
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
      <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: '#AF2A5F', color: 'white', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold', color: 'white'}}>PLAY AS LANDO</Text></TouchableOpacity>
      <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: '#2D8E7A', color: 'white', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold', color: 'white'}}>PLAY AS SPEAKER</Text></TouchableOpacity>
      </View>
      <View style={{flex: 2, backgroundColor: 'white', padding: 5}}>
      <View style={{flex:1}}>
      <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5, textAlign: 'center' }}>SPEAKER</Text>
      <Text style={{color: 'grey',textAlign: 'center' }}>I love coffee dates with startups.</Text>
      </View>
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
      <View style={{flex:1}}>
      <Text style={{color: 'grey', textAlign: 'center', fontWeight: 'bold'}}>Height {"\n"} 180cm</Text>
      </View>
      <View style={{flex:1}}>
      <Text style={{color: 'grey', textAlign: 'center', fontWeight: 'bold'}}>Weight {"\n"} 170lbs</Text>
      </View>
      <View style={{flex:1}}>
      <Text style={{color: 'grey', textAlign: 'center', fontWeight: 'bold'}}>Record {"\n"} 25-0</Text>
      </View>
      </View>
      </View>
      <View style={{flex: 2, backgroundColor: '#5F9EFF', border: '1px solid grey', flexDirection: 'row'}}>
      <TouchableOpacity className='ab2' style={{flex: 1, padding: 10, backgroundColor: 'none'}}>
      <Image source={require("./images/finalMoveCoffee.png")}
      resizeMode = "contain"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      </Image>
      </TouchableOpacity>
      <TouchableOpacity className='ab2' style={{flex: 3, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
      <View>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'left'}}>Final Move</Text>
      <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'left'}}>A barrage of coffee cups.</Text>
      </View>
      </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: '#FF573D', flexDirection: 'row'}}>
      <TouchableOpacity className='ab2' onPress={this.battle} style={{flex: 1, padding: 5, backgroundColor: 'none'}}>
      <Image source={require("./images/battle1.png")}
      resizeMode = "contain"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      </Image>
      </TouchableOpacity>
      <TouchableOpacity className='ab2' onPress={this.battle} style={{flex: 3, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
      <View>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>JOIN THE BATTLE</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity className='ab2' onPress={this.battle} style={{flex: 1, padding: 5, backgroundColor: 'none'}}>
      <Image source={require("./images/battle1.png")}
      resizeMode = "contain"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      </Image>
      </TouchableOpacity>
      </View>
      </View>
      </View>
    )
  }
});
//Battle goes here

var Battle = React.createClass({
  getInitialState() {
    this.props.game
    return {
      defaultAttk: 10,
      playerScore: 0,
      oppScore: 0,
      userCount: 0,
      oppCount: 0,
      confirmed: false,
      selection: {},
      timer: 10,
      attkOrDef: true,
      round: 1
    }
  },
  click(){
    this.setState({userCount: this.state.userCount + this.state.defaultAttk})
    // this.socket.emit('counter', {yourCount: this.state.count});
  },
  selectAbility() {
    Alert.alert(
      'Confirm Attack',
      'Deal 10 damage points per hit',
      [
        {text: 'Yes', onPress: () => {
          this.setState({defaultAttk: 10, confirmed: true, attkOrDef: true});
          var roundTimer = setInterval(() => {
            this.setState({
              timer: this.state.timer - 1
            })
            if(this.state.timer === 0) {
              this.socket.emit('endRound', {player: loggedInUser.username, score: this.state.userCount, attkOrDef: true});
              this.setState({
                userCount: 0,
                oppCount: 0,
                confirmed: false,
                timer: 10,
                round: this.state.round + 1
              })
              clearInterval(roundTimer)
            }
          }, 1000)
        }
      },
      {text: 'No'}
    ],
    {cancelable: false}
  )
},
selectAbility2() {
  Alert.alert(
    'Confirm Defend',
    'Deflect 10 damage points per hit',
    [
      {text: 'Yes', onPress: () => {
        this.setState({defaultAttk: 10, confirmed: true, attkOrDef: false});
        var roundTimer = setInterval(() => {
          this.setState({
            timer: this.state.timer - 1
          })
          if(this.state.timer === 0) {
            this.socket.emit('endRound', {player: loggedInUser.username, score: this.state.userCount, attkOrDef: false});
            this.setState({
              userCount: 0,
              oppCount: 0,
              confirmed: false,
              timer: 10,
              round: this.state.round + 1
            })
            clearInterval(roundTimer)
          }
        }, 1000)
      }
    },
    {text: 'No'}
  ],
  {cancelable: false}
)
},
componentDidMount() {
  this.socket = SocketIOClient('http://localhost:8080');
  this.socket.on('endRound', (scores) => {
    this.setState({
      playerScore: scores.score1,
      oppScore: scores.score2
    })
    if (this.state.round === 4) {
      this.socket.emit('finish', true);
    }
    this.socket.on('finish', (winner) => {
      if (winner.win === 1 && winner.game.player1char === 'Lando' && loggedInUser.username === winner.game.player1.username) {
        this.winnerLando();
      } else if (winner.win === 1 && winner.game.player1char === 'Lando' && loggedInUser.username !== winner.game.player1.username) {
        this.loserLando();
      } else if (winner.win === 2 && winner.game.player2char === 'Lando' && loggedInUser.username === winner.game.player2.username) {
        this.winnerLando();
      } else if (winner.win === 2 && winner.game.player2char === 'Lando' && loggedInUser.username !== winner.game.player2.username) {
        this.loserLando();
      } else if (winner.win === 1 && winner.game.player1char === 'Speaker' && loggedInUser.username === winner.game.player1.username) {
        this.winnerSpeaker();
      } else if (winner.win === 1 && winner.game.player1char === 'Speaker' && loggedInUser.username !== winner.game.player1.username) {
        this.loserSpeaker();
      } else if (winner.win === 2 && winner.game.player2char === 'Speaker' && loggedInUser.username === winner.game.player2.username) {
        this.winnerSpeaker();
      } else if (winner.win === 2 && winner.game.player2char === 'Speaker' && loggedInUser.username !== winner.game.player2.username){
        this.loserSpeaker();
      }  else {
        alert('we are fucked');
      }
    })
  })
  // this.socket.on('counter1', (oppCount) => {
  //   this.setState({
  //     oppCount: oppCount.yourCount
  //   })
  // })
},
winnerLando() {
    this.props.navigator.push({
      component: Books,
      passProps: {result: "win"}
    })
},

winnerSpeaker() {
  this.props.navigator.push({
    component: Coffee,
    passProps: {result: "win"}
  })
},

loserLando() {
    this.props.navigator.push({
      component: Books,
      passProps: {result: "lose"}
    })
},

loserSpeaker() {
    this.props.navigator.push({
      component: Coffee,
      passProps: {result: "lose"}
    })
},
render() {
return (
  <View style={[styles.battleOutline]}>
  {this.state.confirmed ?
    (<Image onPress={this.click} source={require("./finaldestination.jpg")}
    resizeMode = "stretch"
    style={{flex:1, width:null, height:null, justifyContent:'flex-end'}}>
    <View style={{flex: 1, backgroundColor: 'none', flexDirection: 'row'}}>
    <View style={{flex: 1, flexDirection: 'row'}}>
    <TouchableOpacity onPress={this.click} style={{backgroundColor: 'transparent', flex: 1}}>
    <Text style={[styles.buttonScore]}>SCORE{"\n"} {this.state.userCount}</Text>
    </TouchableOpacity>
    </View>
    <View style={{flex: 1, flexDirection: 'row'}}>
    <TouchableOpacity onPress={this.click} style={{backgroundColor: 'transparent', flex: 1}}>
    <Text style={[styles.buttonScore]}>SCORE{"\n"} {this.state.oppCount}</Text>
    </TouchableOpacity>
    </View>

    </View>
    <View style={{flex: 1, backgroundColor: 'none', flexDirection: 'row'}}>
    <View style={{flex: 1, flexDirection: 'row'}}>
    <TouchableOpacity onPress={this.click} style={{backgroundColor: 'transparent', flex: 1, justifyContent: 'flex-end'}}>
    <Text style={[styles.buttonScore]}>ROUND{"\n"} {this.state.round}</Text>
    </TouchableOpacity>
    </View>
    <View style={{flex: 1, backgroundColor: 'transparent'}} >
    <TouchableOpacity onPress={this.click} style={{backgroundColor: 'transparent', flex: 1, justifyContent: 'flex-end'}}>
    <Text style={[styles.buttonScore]}>TIMER{"\n"} {this.state.timer}</Text>
    </TouchableOpacity>
    </View>
    </View>
    </Image>)
    :
    (<Image source={require("./finaldestination.jpg")}
    resizeMode = "stretch"
    style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'flex-end', flexDirection: 'row'}}>
    <View style={{flex: 1, backgroundColor: 'none'}} >
    </View>
    <View style={{flex: 1, backgroundColor: 'none'}} >
    </View>
    </Image>)}


    <View style={[styles.battleStatusView]}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>SCOREBOARD</Text>
    </View>
    <View style={{flexDirection: 'row', flex:2}}>
    <TouchableOpacity onPress={this.click} style={[styles.statusView]}>
    <Image source={require("./images/score1.png")}
    resizeMode = "contain"
    style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
    <View>
    <Text style={{color: 'black', fontSize: 50, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'transparent' , textShadowColor: 'black'}}>{this.state.playerScore}</Text>
    </View>
    </Image>
    </TouchableOpacity>
    <TouchableOpacity onPress={this.click} style={[styles.statusView]}>
    <Image source={require("./images/score2.jpg")}
    resizeMode = "contain"
    style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
    <View>
    <Text style={{color: 'black', fontSize: 50, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'transparent', textShadowColor: 'black'}}>{this.state.oppScore}</Text>
    </View>
    </Image>
    </TouchableOpacity>
    </View>
    <View style={{flexDirection: 'row', flex:2 , backgroundColor: '#AF2A5F'}}>
    <TouchableOpacity className='ab1' onPress={this.selectAbility} style={{flex: 1, padding: 10, backgroundColor: 'none'}}>
    <Image source={require("./images/attack.png")}
    resizeMode = "contain"
    style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
    </Image>
    </TouchableOpacity>
    <TouchableOpacity className='ab1' onPress={this.selectAbility} style={{flex: 2, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
    <View>
    <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>ATTACK</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 1, padding: 10, backgroundColor: 'none'}}>
    <Image source={require("./images/defend.png")}
    resizeMode = "contain"
    style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
    </Image>
    </TouchableOpacity>
    <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 2, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
    <View>
    <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>DEFEND</Text>
    </View>
    </TouchableOpacity>
    </View>
    <View style={{flexDirection: 'row', flex:2 , backgroundColor: '#2D8E7A'}}>
    <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 1, padding: 10, backgroundColor: 'none'}}>
    <Image source={require("./images/coffeebooks.png")}
    resizeMode = "contain"
    style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
    </Image>
    </TouchableOpacity>
    <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 2, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
    <View>
    <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>FINAL MOVE</Text>
    </View>
    </TouchableOpacity>
    </View>
    </View>
    </View>
    )
  }
})


var Books = React.createClass({
  getInitialState() {
    return {
      defaultAttk: 10,
      player1Score: 0,
      player2Score: 0,
      countLeft: 0,
      countRight: 0,
      confirmed: false,
      timer: 10,
      attkOrDef: true,
      round: 1,
      spinValue: new Animated.Value(0),
      springValue: new Animated.Value(1),
      animatedValue: new Animated.Value(0)
    }
  },
  componentDidMount () {
  this.spin();
  this.spring();
  this.animate();
  },
  alert() {
    if (this.props.result === 'win') {
      alert("YOU WON! CONGRATS GO TELL PRATH.... WHOOPS HE'S IN HAWAII");
    } else {
      alert("YOU LOST! IF YOU'RE NOT FIRST, YOU'RE LAST!!!!!!!!!");
    }
  },
  spin () {
      this.state.spinValue.setValue(0)
      Animated.timing(
        this.state.spinValue,
        {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear
        }
      ).start(() => this.spin())
  },
  spring () {
  this.state.springValue.setValue(0.3)
  Animated.spring(
    this.state.springValue,
    {
      toValue: 1,
      friction: 1
    }
  ).start(() => this.spring())
},
animate () {
  this.state.animatedValue.setValue(0)
  Animated.timing(
    this.state.animatedValue,
    {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }
  ).start(() => this.animate())
},
render() {
  const spin = this.state.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['360deg', '0deg']
  })
  const spin1 = this.state.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
  })
  const spin2 = this.state.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '180deg']
  })
  const marginLeft = this.state.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50]
  })
  const marginTop = this.state.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  })
  const marginBottom = this.state.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0]
  })
  const movingMargin = this.state.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 300, 0]
  })
  const rotateX = this.state.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '0deg']
  })
  return (
    <View style={[styles.battleOutline]}>
      <Image source={require("./finaldestination.jpg")}
      resizeMode = "stretch"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <Animated.Image
        style={{flex: 1, width: 175, height: 175, marginLeft }}
          source={{uri: 'https://images-na.ssl-images-amazon.com/images/I/517wplLjOXL._SX329_BO1,204,203,175_.jpg'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, transform: [{rotate: spin1}] }}
          source={{uri: 'https://images-na.ssl-images-amazon.com/images/I/517wplLjOXL._SX329_BO1,204,203,175_.jpg'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, marginTop }}
          source={{uri: 'https://img1.od-cdn.com/ImageType-400/1191-1/EBE/E52/69/%7BEBEE5269-D469-45DF-A6A6-CB62081EFAB2%7DImg400.jpg'}}
      />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <Animated.Image
        style={{ flex: 1,  width: 175, height: 175, marginTop }}
          source={{uri: 'https://ceosatgsu.files.wordpress.com/2012/01/book2.jpg'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, transform: [{rotate: spin2}]}}
          source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/50/dc/34/50dc34a07a26d43bf568f5b3e01ad6f3.jpg'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, transform: [{rotateX}] }}
          source={{uri: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAQyAAAAJDliYjAyYmIxLWM5OGEtNDBhNS1iNTM1LTVkZjJlY2IwNDU0MQ.jpg'}}
      />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, transform: [{rotateX}] }}
          source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/04/e5/97/04e597e8e78a47d822602899f4d705a0.jpg'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, marginLeft: movingMargin }}
          source={{uri: 'https://images-na.ssl-images-amazon.com/images/I/41EV9hbgbCL._SX327_BO1,204,203,175_.jpg'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, marginTop }}
          source={{uri: 'https://images-na.ssl-images-amazon.com/images/I/51NzjhIhK0L._SX322_BO1,204,203,175_.jpg'}}
      />
      </View>

      </Image>
      </View>
    )
  }
})


var Coffee = React.createClass({
  getInitialState() {
    return {
      defaultAttk: 10,
      player1Score: 0,
      player2Score: 0,
      countLeft: 0,
      countRight: 0,
      confirmed: false,
      timer: 10,
      attkOrDef: true,
      round: 1,
      spinValue: new Animated.Value(0),
      springValue: new Animated.Value(1),
      animatedValue: new Animated.Value(0)
    }
  },
  componentDidMount () {
  this.spin();
  this.spring();
  this.animate();
  },
  alert() {
    if (this.props.result === 'win') {
      alert("YOU WON! CONGRATS GO TELL PRATH.... WHOOPS HE'S IN HAWAII");
    } else {
      alert("YOU LOST! IF YOU'RE NOT FIRST, YOU'RE LAST!!!!!!!!!");
    }
  },
  spin () {
      this.state.spinValue.setValue(0)
      Animated.timing(
        this.state.spinValue,
        {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear
        }
      ).start(() => this.spin())
  },
  spring () {
  this.state.springValue.setValue(0.3)
  Animated.spring(
    this.state.springValue,
    {
      toValue: 1,
      friction: 1
    }
  ).start(() => this.spring())
},
animate () {
  this.state.animatedValue.setValue(0)
  Animated.timing(
    this.state.animatedValue,
    {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }
  ).start(() => this.animate())
},
render() {
  const spin = this.state.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['360deg', '0deg']
  })
  const spin1 = this.state.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
  })
  const spin2 = this.state.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '180deg']
  })
  const marginLeft = this.state.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50]
  })
  const marginTop = this.state.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  })
  const marginBottom = this.state.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0]
  })
  const movingMargin = this.state.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 300, 0]
  })
  const rotateX = this.state.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '0deg']
  })
  return (

    <View  style={[styles.battleOutline]}>
      <Image source={require("./finaldestination.jpg")}
      resizeMode = "stretch"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <Animated.Image
        style={{flex: 1, width: 175, height: 175, marginLeft }}
          source={{uri: 'https://openclipart.org/image/2400px/svg_to_png/22305/pitr-Coffee-cup-icon.png'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, transform: [{rotate: spin1}] }}
          source={{uri: 'https://www.dunkindonuts.com/content/dam/Dunkin_Donuts/coffee-leadership/Facebook-Icon.jpg'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, marginTop }}
          source={{uri: 'https://www.asone.co.uk/wp-content/uploads/2014/01/google-plus-icon-coffee.png'}}
      />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <Animated.Image
        style={{ flex: 1,  width: 175, height: 175, marginTop }}
          source={{uri: 'https://orig07.deviantart.net/10d3/f/2016/021/b/1/001_by_tilantha_hansanath-d9or6zu.png'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, transform: [{rotate: spin2}]}}
          source={{uri: 'https://www.dunkindonuts.com/content/dam/Dunkin_Donuts/coffee-leadership/Facebook-Icon.jpg'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, transform: [{rotateX}] }}
          source={{uri: 'https://cdn4.iconfinder.com/data/icons/Starbucks_coffee/PNG/512x512/starbucks_coffee_3.png'}}
      />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, transform: [{rotateX}] }}
          source={{uri: 'https://www.iconninja.com/files/185/697/164/youtube-icon.png'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, marginLeft: movingMargin }}
          source={{uri: 'http://annerallen.com/wp-content/uploads/2016/04/6.png'}}
      />
      <Animated.Image
        style={{ flex: 1, width: 175, height: 175, marginTop }}
          source={{uri: 'https://cdn4.iconfinder.com/data/icons/Starbucks_coffee/PNG/512x512/starbucks_coffee_3.png'}}
      />
      </View>

      </Image>
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
        <TouchableOpacity onPress={() => this.props.navigator.push({title: "Battle", component: CharacterBio})} style={[styles.button, styles.buttonPurple]}>
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 5,
    textAlign: 'center'
  },
  buttonScore: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 5,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 20
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
    flex: 1
  },
  otherChar: {
    flexDirection: 'column',
    flex: 1
  },
  battleStatusView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1
  },
  statusView: {
    flex: 1
  },
  finalMoveView: {
    backgroundColor: '#5D78FF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  finalMoveView1: {
    backgroundColor: '#308B2F',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  finalMoveView2: {
    backgroundColor: '#EFC23F',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  finalMoveView3: {
    backgroundColor: '#EF3F3F',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  finalMoveView4: {
    backgroundColor: '#CF3FEF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  cardView: {
    backgroundColor: 'red',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  healthView: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  userList: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});






AppRegistry.registerComponent('SOMAFight', () => SOMAFight);
