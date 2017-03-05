var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Game = models.Game;
var Character = models.Character;
var Card = models.Card;
var socketio = require('socket.io')


//////////////////////////////// PUBLIC ROUTES ////////////////////////////////
// Users who are not logged in can see these routes



///////////////////////////// END OF PUBLIC ROUTES /////////////////////////////

// router.use(function(req, res, next){
//   if (!req.user) {
//     res.redirect('/login');
//   } else {
//     return next();
//   }
// });

//////////////////////////////// PRIVATE ROUTES ////////////////////////////////
// Only logged in users can see these routes


router.get('/protected', function(req, res, next) {
  res.render('protectedRoute', {
    username: req.user.username,
  });
});

router.post('/inBattle', function(req, res) {
  var userId = req.body.userId
  User.findById(userId, function(err, user) {
    user.inBattle = true
    user.save(function(err) {
      if(err) {
        res.status(400).json(err)
      } else {
      res.json({
        success: true,
        user: user
      })
      }
    })
  })
})


router.get('/logout', function(req, res) {
  var user = req.user;
  user.online = false;
  user.save(function(err) {
    if(err) {
      res.json({
        success: false,
        error: err
      })
    } else {
      res.json({
        success: true
      })
    }
  })
})


router.get('/challengers', function(req, res) {
  User.find({inBattle: false}, function(err, users) {
    if(err) {
      res.json({
        success: false,
        error: err
      })
    } else {
      res.json({
        users: users
      })
    }
  })
})

router.post('/outBattle', function(req, res) {
  var userId = req.body.userId
  User.findById(userId, function(err, user) {
    user.inBattle = false
    user.save(function(err) {
      if(err) {
        res.status(400).json(err)
      } else {
      res.json({
        success: true,
        user: user
      })
      }
    })
  })
})

router.get('/leaders', function(req, res) {
  User.find(function(err, users) {
    var userArray = users;
    userArray.sort(function(a, b) {
      return b.totalWins - a.totalWins
    })
    res.json({
      winners: userArray
    })
  })
})






///////////////////////////// END OF PRIVATE ROUTES /////////////////////////////

module.exports = router;
