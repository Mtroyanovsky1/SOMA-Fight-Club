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
  Animated
} from 'react-native';


var Login = React.createClass({
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
  render() {
    return (
      <Image source={require("./images/rickfight.png")}
      resizeMode = "stretch"
      style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'flex-end'}}>
      <View style={{width:310, height:175, margin:10}}>
      <View style={{flex:1, borderColor:'#d3d3d3'}}>
      <TextInput
      placeholder = "USERNAME"
      placeholderTextColor = "white"
      style = {styles.textInput}/>
      </View>
      <View style={{flex:1, borderColor:'#d3d3d3'}}>
      <TextInput
      placeholder = "PASSWORD"
      placeholderTextColor = "white"
      style = {styles.textInput}/>
      </View>
      <TouchableOpacity onPress={this.register}
      style={{backgroundColor:'#AF2A5F', flex:1, justifyContent:'center', opacity: 0.8, alignItems:'center'}}>
      <Text style={{color:'#fff', fontSize:12, fontWeight:'700'}}>REGISTER</Text></TouchableOpacity>
      <TouchableOpacity onPress={this.main}
      style={{backgroundColor:'#AF2A5F', flex:1, justifyContent:'center', opacity: 0.8, alignItems:'center'}}>
      <Text style={{color:'#fff', fontSize:12, fontWeight:'700'}}>LOG IN</Text></TouchableOpacity>
      </View>
      </Image>
    );
  }
});


var Register = React.createClass({
  login() {
    this.props.navigator.push({
      component: Login,
      title: "Login"
    });
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
      style = {styles.textInput}/>
      </View>
      <View style={{flex:1, borderColor:'#d3d3d3'}}>
      <TextInput
      placeholder = "LAST NAME"
      placeholderTextColor = "white"
      style = {styles.textInput}/>
      </View>
      <View style={{flex:1, borderColor:'#d3d3d3'}}>
      <TextInput
      placeholder = "USERNAME"
      placeholderTextColor = "white"
      style = {styles.textInput}/>
      </View>
      <View style={{flex:1, borderColor:'#d3d3d3'}}>
      <TextInput
      placeholder = "PASSWORD"
      placeholderTextColor = "white"
      style = {styles.textInput}/>
      </View>
      <TouchableOpacity onPress={this.login}
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
    // this.socket.emit('message', 'hi');
    // this.socket.on('message', (str) => {
    //   alert('lhoohohoho')
    // })
  },
  challenge(toChallenge) {
    this.socket.emit('')
  },
  render() {
    return (
      <View style={[styles.userList]}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          Go fight someone!
        </Text>
        {this.state.users.map((user) =>
          <TouchableOpacity onPress={() => this.props.navigator.push({title: "Battle", component: CharacterBio})} style={[styles.button, styles.buttonPurple]}>
            <Text>{user.username} # of wins: {user.totalWins}</Text>
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
});

var CharacterBio = React.createClass({
  characterOne(){
    this.props.navigator.push({
      component: characterOne
    })
  },
  characterTwo(){
    this.props.navigator.push({
      component: characterTwo
    })
  },
  characterThree(){
    this.props.navigator.push({
      component: characterThree
    })
  },
  characterFour(){
    this.props.navigator.push({
      component: characterFour
    })
  },
  characterFive(){
    this.props.navigator.push({
      component: characterFive
    })
  },
  characterSix(){
    this.props.navigator.push({
      component: characterSix
    })
  },
  characterSeven(){
    this.props.navigator.push({
      component: characterSeven
    })
  },
  battle(){
    this.props.navigator.push({
      component: Battle
    })
  },
  render(){
    return (
      <View style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: '#3BC356'}}>
       <Image source={require("./images/abhi.png")}
       resizeMode = "contain"
       style={{flex:1, alignItems:'center', width:null, height:null}}/>
       </View>
       <View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={{flex: 1, backgroundColor: 'yellow', flexDirection: 'row'}}>
             <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
             <Image source={require("./images/mouse.png")}
             resizeMode = "contain"
             style={{flex:1}}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: 'white',alignItems:'center', justifyContent: 'center'}}>
             <Image source={require("./images/cheetah.png")}
             resizeMode = "contain"
             style={{flex:1}}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={this.characterThree} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
             <Image source={require("./images/bee.png")}
             resizeMode = "contain"
             style={{flex:1}}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={this.characterFour} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
             <Image source={require("./images/koala.png")}
             resizeMode = "contain"
             style={{flex:1}}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={this.characterFive} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
             <Image source={require("./images/toucan.png")}
             resizeMode = "contain"
             style={{flex:1}}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={this.characterSix} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
             <Image source={require("./images/turtle.png")}
             resizeMode = "contain"
             style={{flex:1}}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={this.characterSeven} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
             <Image source={require("./images/crocodile.png")}
             resizeMode = "contain"
             style={{flex:1}}/>
             </TouchableOpacity>
           </View>
         <View style={{flex: 2, backgroundColor: 'white', padding: 5, textAlign: 'justify'}}>
         <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5 , textAlign: 'justify'}}>Keytar pug chillwave enamel pin, freegan cardigan letterpress
         kinfolk art party pitchfork fashion axe meggings. Tilde stumptown pitchfork, 3 wolf moon coloring book squid waistcoat mustache church-key ethical
          yuccie kombucha. </Text></View>
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
  characterOne(){
    this.props.navigator.push({
      component: characterOne
    })
  },
  characterTwo(){
    this.props.navigator.push({
      component: characterTwo
    })
  },
  characterThree(){
    this.props.navigator.push({
      component: characterThree
    })
  },
  characterFour(){
    this.props.navigator.push({
      component: characterFour
    })
  },
  characterFive(){
    this.props.navigator.push({
      component: characterFive
    })
  },
  characterSix(){
    this.props.navigator.push({
      component: characterSix
    })
  },
  characterSeven(){
    this.props.navigator.push({
      component: characterSeven
    })
  },
  battle(){
    this.props.navigator.push({
      component: Battle
    })
  },
  render(){
    return (
      <View style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: 'grey'}}>
       <Image source={require("./images/abhi.png")}
       resizeMode = "contain"
       style={{flex:1, alignItems:'center', width:null, height:null}}/>
       </View>
       <View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={{flex: 1, backgroundColor: 'yellow', flexDirection: 'row'}}>
         <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/mouse.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: 'white',alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/cheetah.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterThree} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/bee.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFour} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/koala.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFive} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/toucan.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSix} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/turtle.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSeven} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/crocodile.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
           </View>
         <View style={{flex: 2, backgroundColor: 'white', padding: 5, textAlign: 'justify'}}>
         <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5 , textAlign: 'justify'}}>Keytar pug chillwave enamel pin, freegan cardigan letterpress
         kinfolk art party pitchfork fashion axe meggings. Tilde stumptown pitchfork, 3 wolf moon coloring book squid waistcoat mustache church-key ethical
          yuccie kombucha. </Text></View>
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
  characterOne(){
    this.props.navigator.push({
      component: characterOne
    })
  },
  characterTwo(){
    this.props.navigator.push({
      component: characterTwo
    })
  },
  characterThree(){
    this.props.navigator.push({
      component: characterThree
    })
  },
  characterFour(){
    this.props.navigator.push({
      component: characterFour
    })
  },
  characterFive(){
    this.props.navigator.push({
      component: characterFive
    })
  },
  characterSix(){
    this.props.navigator.push({
      component: characterSix
    })
  },
  characterSeven(){
    this.props.navigator.push({
      component: characterSeven
    })
  },
  battle(){
    this.props.navigator.push({
      component: Battle
    })
  },
  render(){
    return (
      <View style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: 'orange'}}>
       <Image source={require("./images/abhi.png")}
       resizeMode = "contain"
       style={{flex:1, alignItems:'center', width:null, height:null}}/>
       </View>
       <View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={{flex: 1, backgroundColor: 'yellow', flexDirection: 'row'}}>
         <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/mouse.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: 'white',alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/cheetah.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterThree} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/bee.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFour} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/koala.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFive} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/toucan.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSix} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/turtle.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSeven} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/crocodile.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
           </View>
         <View style={{flex: 2, backgroundColor: 'white', padding: 5, textAlign: 'justify'}}>
         <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5 , textAlign: 'justify'}}>Keytar pug chillwave enamel pin, freegan cardigan letterpress
         kinfolk art party pitchfork fashion axe meggings. Tilde stumptown pitchfork, 3 wolf moon coloring book squid waistcoat mustache church-key ethical
          yuccie kombucha. </Text></View>
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

var characterThree = React.createClass({
  characterOne(){
    this.props.navigator.push({
      component: characterOne
    })
  },
  characterTwo(){
    this.props.navigator.push({
      component: characterTwo
    })
  },
  characterThree(){
    this.props.navigator.push({
      component: characterThree
    })
  },
  characterFour(){
    this.props.navigator.push({
      component: characterFour
    })
  },
  characterFive(){
    this.props.navigator.push({
      component: characterFive
    })
  },
  characterSix(){
    this.props.navigator.push({
      component: characterSix
    })
  },
  characterSeven(){
    this.props.navigator.push({
      component: characterSeven
    })
  },
  battle(){
    this.props.navigator.push({
      component: Battle
    })
  },
  render(){
    return (
      <View style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: 'blue'}}>
       <Image source={require("./images/abhi.png")}
       resizeMode = "contain"
       style={{flex:1, alignItems:'center', width:null, height:null}}/>
       </View>
       <View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={{flex: 1, backgroundColor: 'yellow', flexDirection: 'row'}}>
         <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/mouse.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: 'white',alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/cheetah.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterThree} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/bee.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFour} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/koala.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFive} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/toucan.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSix} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/turtle.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSeven} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/crocodile.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
           </View>
         <View style={{flex: 2, backgroundColor: 'white', padding: 5, textAlign: 'justify'}}>
         <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5 , textAlign: 'justify'}}>Keytar pug chillwave enamel pin, freegan cardigan letterpress
         kinfolk art party pitchfork fashion axe meggings. Tilde stumptown pitchfork, 3 wolf moon coloring book squid waistcoat mustache church-key ethical
          yuccie kombucha. </Text></View>
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

var characterFour = React.createClass({
  characterOne(){
    this.props.navigator.push({
      component: characterOne
    })
  },
  characterTwo(){
    this.props.navigator.push({
      component: characterTwo
    })
  },
  characterThree(){
    this.props.navigator.push({
      component: characterThree
    })
  },
  characterFour(){
    this.props.navigator.push({
      component: characterFour
    })
  },
  characterFive(){
    this.props.navigator.push({
      component: characterFive
    })
  },
  characterSix(){
    this.props.navigator.push({
      component: characterSix
    })
  },
  characterSeven(){
    this.props.navigator.push({
      component: characterSeven
    })
  },
  battle(){
    this.props.navigator.push({
      component: Battle
    })
  },
  render(){
    return (
      <View style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: 'green'}}>
       <Image source={require("./images/abhi.png")}
       resizeMode = "contain"
       style={{flex:1, alignItems:'center', width:null, height:null}}/>
       </View>
       <View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={{flex: 1, backgroundColor: 'yellow', flexDirection: 'row'}}>
         <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/mouse.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: 'white',alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/cheetah.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterThree} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/bee.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFour} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/koala.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFive} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/toucan.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSix} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/turtle.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSeven} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/crocodile.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
           </View>
         <View style={{flex: 2, backgroundColor: 'white', padding: 5, textAlign: 'justify'}}>
         <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5, textAlign: 'justify' }}>Keytar pug chillwave enamel pin, freegan cardigan letterpress
         kinfolk art party pitchfork fashion axe meggings. Tilde stumptown pitchfork, 3 wolf moon coloring book squid waistcoat mustache church-key ethical
          yuccie kombucha. </Text></View>
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

var characterFive = React.createClass({
  characterOne(){
    this.props.navigator.push({
      component: characterOne
    })
  },
  characterTwo(){
    this.props.navigator.push({
      component: characterTwo
    })
  },
  characterThree(){
    this.props.navigator.push({
      component: characterThree
    })
  },
  characterFour(){
    this.props.navigator.push({
      component: characterFour
    })
  },
  characterFive(){
    this.props.navigator.push({
      component: characterFive
    })
  },
  characterSix(){
    this.props.navigator.push({
      component: characterSix
    })
  },
  characterSeven(){
    this.props.navigator.push({
      component: characterSeven
    })
  },
  battle(){
    this.props.navigator.push({
      component: Battle
    })
  },
  render(){
    return (
      <View style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: 'yellow'}}>
       <Image source={require("./images/abhi.png")}
       resizeMode = "contain"
       style={{flex:1, alignItems:'center', width:null, height:null}}/>
       </View>
       <View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={{flex: 1, backgroundColor: 'yellow', flexDirection: 'row'}}>
         <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/mouse.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: 'white',alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/cheetah.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterThree} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/bee.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFour} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/koala.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFive} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/toucan.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSix} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/turtle.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSeven} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/crocodile.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
           </View>
         <View style={{flex: 2, backgroundColor: 'white', padding: 5, textAlign: 'justify'}}>
         <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5 , textAlign: 'justify'}}>Keytar pug chillwave enamel pin, freegan cardigan letterpress
         kinfolk art party pitchfork fashion axe meggings. Tilde stumptown pitchfork, 3 wolf moon coloring book squid waistcoat mustache church-key ethical
          yuccie kombucha. </Text></View>
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

var characterSix = React.createClass({
  characterOne(){
    this.props.navigator.push({
      component: characterOne
    })
  },
  characterTwo(){
    this.props.navigator.push({
      component: characterTwo
    })
  },
  characterThree(){
    this.props.navigator.push({
      component: characterThree
    })
  },
  characterFour(){
    this.props.navigator.push({
      component: characterFour
    })
  },
  characterFive(){
    this.props.navigator.push({
      component: characterFive
    })
  },
  characterSix(){
    this.props.navigator.push({
      component: characterSix
    })
  },
  characterSeven(){
    this.props.navigator.push({
      component: characterSeven
    })
  },
  battle(){
    this.props.navigator.push({
      component: Battle
    })
  },
  render(){
    return (
      <View style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: 'purple'}}>
       <Image source={require("./images/abhi.png")}
       resizeMode = "contain"
       style={{flex:1, alignItems:'center', width:null, height:null}}/>
       </View>
       <View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={{flex: 1, backgroundColor: 'yellow', flexDirection: 'row'}}>
         <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/mouse.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: 'white',alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/cheetah.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterThree} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/bee.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFour} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/koala.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFive} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/toucan.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSix} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/turtle.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSeven} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/crocodile.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
           </View>
         <View style={{flex: 2, backgroundColor: 'white', padding: 5, textAlign: 'justify'}}>
         <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5, textAlign: 'justify' }}>Keytar pug chillwave enamel pin, freegan cardigan letterpress
         kinfolk art party pitchfork fashion axe meggings. Tilde stumptown pitchfork, 3 wolf moon coloring book squid waistcoat mustache church-key ethical
          yuccie kombucha. </Text></View>
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

var characterSeven = React.createClass({
  characterOne(){
    this.props.navigator.push({
      component: characterOne
    })
  },
  characterTwo(){
    this.props.navigator.push({
      component: characterTwo
    })
  },
  characterThree(){
    this.props.navigator.push({
      component: characterThree
    })
  },
  characterFour(){
    this.props.navigator.push({
      component: characterFour
    })
  },
  characterFive(){
    this.props.navigator.push({
      component: characterFive
    })
  },
  characterSix(){
    this.props.navigator.push({
      component: characterSix
    })
  },
  characterSeven(){
    this.props.navigator.push({
      component: characterSeven
    })
  },
  battle(){
    this.props.navigator.push({
      component: Battle
    })
  },
  render(){
    return (
      <View style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: 'black'}}>
       <Image source={require("./images/abhi.png")}
       resizeMode = "contain"
       style={{flex:1, alignItems:'center', width:null, height:null}}/>
       </View>
       <View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={{flex: 1, backgroundColor: 'yellow', flexDirection: 'row'}}>
         <TouchableOpacity onPress={this.characterOne} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/mouse.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterTwo} style={{flex: 1, backgroundColor: 'white',alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/cheetah.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterThree} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/bee.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFour} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/koala.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterFive} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/toucan.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSix} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/turtle.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.characterSeven} style={{flex: 1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
         <Image source={require("./images/crocodile.png")}
         resizeMode = "contain"
         style={{flex:1}}/>
         </TouchableOpacity>
           </View>
         <View style={{flex: 2, backgroundColor: 'white', padding: 5}}>
         <Text style={{color: 'grey',fontStyle: 'italic', fontWeight: 'bold', marginBottom: 5, textAlign: 'justify'}}>Keytar pug chillwave enamel pin, freegan cardigan letterpress
         kinfolk art party pitchfork fashion axe meggings. Tilde stumptown pitchfork, 3 wolf moon coloring book squid waistcoat mustache church-key ethical
          yuccie kombucha. </Text></View>
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
