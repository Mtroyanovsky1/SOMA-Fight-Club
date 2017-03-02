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
  time: Date
});

var cardSchema = new mongoose.Schema({
  title: String,
  attackEff: String,
  defenseEff: String
});

var charSchema = new mongoose.Schema({
  name: String,
  image: String, //image url
  ability: String
});

Card = mongoose.model('Card', cardSchema)
Character = mongoose.model('Character', charSchema)
Game = mmongoose.model('Game', gameSchema)
User = mongoose.model('User', userSchema);

module.exports = {
    Card:Card,
    Character:Character,
    Game:Game,
    User:User
};
