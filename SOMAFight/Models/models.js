var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  totalWins: {default: 0, type: Number},
  totalLosses: {default: 0, type: Number}
});

var gameSchema = new mongoose.Schema({
  loser: String,
  winner: String,
  time: {type:Date, default: Date.now()}
});

var charSchema = new mongoose.Schema({
  name: String,
  image: String, //image url
  ultimateAbility: String,
  attack: {type:Number, default: 10},
  defense: {type:Number, default: 10},
  specAttk: Number,
  specDef: Number
});

Character = mongoose.model('Character', charSchema)
Game = mmongoose.model('Game', gameSchema)
User = mongoose.model('User', userSchema);

module.exports = {
    Character:Character,
    Game:Game,
    User:User
};
