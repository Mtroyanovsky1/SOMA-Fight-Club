
var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Game = models.Game;
var Charatcer = models.Character;
var Card = models.Card;

module.exports = function() {

  router.get('/', function(req, res){
    console.log("key");
    res.json({
      life:"hi"
    })
  })
  router.post('/signup', function(req, res) {
    // validation step
    var user = new models.User({
      firstName: req.body.firstName,
      lastname: req.body.lastName,
      username: req.body.username,
      password: req.body.password
    });
    user.save(function(err, user) {
      if (err) {
        res.json({
          success: false,
          error: err + 'This action failed'
        })
      } else {
        res.json({
          success: true,
          user: user
        })
      }
    });
  });

  // POST Login page
  router.post('/login', function(req, res) {
    User.find({username: req.body.username}, function(err, user) {
      if(err) {
        res.json({
          success: false,
          error: err
        })
      } else {
        if(user.password === req.body.password) {
          res.json({
            success: true,
            user: user
          })
        } else {
          res.json({
            success: false,
            error: "password didn't match"
          })
        }
      }
    })
  });


  return router;
};
