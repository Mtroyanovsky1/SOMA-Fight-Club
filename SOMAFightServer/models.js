var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  inBattle: {type: Boolean, default: false},
  totalWins: {type: Number, default: 0},
  totalLosses: {type: Number, default: 0}
});


var gameSchema = new mongoose.Schema({
  loser: String,
  winner: String,
  time: Date
});

var battle = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  opponent: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

Game = mongoose.model('Game', gameSchema);
User = mongoose.model('User', userSchema);

module.exports = {
    Game:Game,
    User:User
};
