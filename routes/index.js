var express = require('express');
var router = express.Router();
var mongo=require('mongodb');
var db = require('monk')('localhost/nodeblog');
/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  //display post
  var posts= db.get('post');
  posts.find({},{}, function(err, posts){
    res.render('index', { posts: posts});
  });
});
module.exports = router;
