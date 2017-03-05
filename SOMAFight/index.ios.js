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
            <Text style={[styles.buttonText]}>LEADERBOARD</Text>
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
    battlePage(){
      this.props.navigator.push({
        component: Battle
      })
    },
    characterPage(){
      this.props.navigator.push({
        component: CharacterBio
      })
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
          <TouchableOpacity onPress={this.battlePage} style={[styles.button, styles.buttonPurple]}>
            <Text>
              BATTLE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.characterPage} style={[styles.button, styles.buttonPurple]}>
            <Text>
              CHARACTERS
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  });


  var landoDes = "";
  var speakerDes = "";

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
    battle(){
      this.props.navigator.push({
        component: Battle
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
             <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 1, padding: 10, backgroundColor: 'none'}}>
               <Image source={require("./images/finalMoveBooks.png")}
               resizeMode = "contain"
               style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
               </Image>
             </TouchableOpacity>
             <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 3, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
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
    battle(){
      this.props.navigator.push({
        component: Battle
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
             <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 1, padding: 10, backgroundColor: 'none'}}>
               <Image source={require("./images/finalMoveBooks.png")}
               resizeMode = "contain"
               style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
               </Image>
             </TouchableOpacity>
             <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 3, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
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
    battle(){
      this.props.navigator.push({
        component: Battle
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
             <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 1, padding: 10, backgroundColor: 'none'}}>
               <Image source={require("./images/finalMoveCoffee.png")}
               resizeMode = "contain"
               style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
               </Image>
             </TouchableOpacity>
             <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 3, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
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


  var Battle = React.createClass({
    setInitialState() {
      return {
        defaultAttk: 10,
      }
    },
    selectAbility() {
      Alert.alert(
        'Confirm Attack',
        'Deal 10 damage points per hit',
        [
          {text: 'Yes', onPress: () => {

                this.setState({defaultAttk: 20});
                this.props.navigator.push({component: FinalBattle, passProps: {attk: this.state.defaultAttk}})
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

                this.setState({defaultAttk: 30});
                this.props.navigator.push({component: FinalBattle, passProps: {attk: this.state.defaultAttk}})
              }
            },
          {text: 'No'}
        ],
        {cancelable: false}
      )
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
                <Text style={{backgroundColor: 'transparent'}}>Main Menu</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.otherChar]}>
              <TouchableOpacity onPress={() => console.log('hot')} style={[styles.button]}>
                <Text style={{backgroundColor: 'transparent'}}>Main Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
          </Image>
          <View style={[styles.battleStatusView]}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>SCOREBOARD</Text>
          </View>
          <View style={{flexDirection: 'row', flex:2}}>
            <TouchableOpacity onPress={() => console.log('final move')} style={[styles.statusView]}>
              <Image source={require("./images/score1.png")}
              resizeMode = "contain"
              style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
              <View>
                <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'transparent', marginBottom: 25 }}>0</Text>
              </View>
              </Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('final move')} style={[styles.statusView]}>
              <Image source={require("./images/score2.jpg")}
              resizeMode = "contain"
              style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
              <View>
                <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'transparent', marginBottom: 30}}>0</Text>
              </View>
              </Image>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', flex:2 , backgroundColor: '#AF2A5F'}}>
          <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 1, padding: 10, backgroundColor: 'none'}}>
            <Image source={require("./images/attack.png")}
            resizeMode = "contain"
            style={{flex:1, alignItems:'center', width:null, height:null, justifyContent:'center'}}>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity className='ab2' onPress={this.selectAbility2} style={{flex: 2, padding: 10, backgroundColor: 'none', justifyContent: 'center'}}>
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

  var FinalBattle = React.createClass({
    getInitialState(){
      return {
        countLeft: 0,
        countRight: 0
      }
    },
    clickLeft(){
      this.setState({
        countLeft: this.state.countLeft + 1
      })
    },
    clickRight(){
      this.setState({
        countRight: this.state.countRight + 1
      })
    },
    render() {
      return (
        <View style={[styles.battleOutline]}>
          <Image source={require("./finaldestination.jpg")}
          resizeMode = "stretch"
          style={{flex:1, width:null, height:null}}>
          <View style={[styles.battleCharacterView]} >
            <View style={[styles.yourChar]}>
              <TouchableOpacity onPress={this.clickLeft} style={{backgroundColor: 'none', flex: 1, alignItems: 'center'}}>
                <Text style={[styles.buttonScore]}>SCORE{"\n"} {this.state.countLeft}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.otherChar]}>
              <TouchableOpacity onPress={this.clickRight} style={{backgroundColor: 'none', flex: 1, alignItems: 'center'}}>
                <Text style={[styles.buttonScore]}>SCORE{"\n"} {this.state.countRight}</Text>
              </TouchableOpacity>
            </View>
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
        <View style={{padding: 20}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>
          LEADERBOARD
        </Text>
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
