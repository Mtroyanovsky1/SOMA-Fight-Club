var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  inBattle: {type: Boolean, default: false},
  online:{type: Boolean, default: false},
  totalWins: {type: Number, default: 0},
  totalLosses: {type: Number, default: 0}
});


var gameSchema = new mongoose.Schema({
  player1char: String,
  player2char: String,
  player1: Object,
  player2: Object,
  score1: Number,
  score2: Number,
  player1enter: Boolean,
  player2enter: Boolean,

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
