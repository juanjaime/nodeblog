var express = require('express');
var router = express.Router();
var multer=require('multer');
var upload=multer({dest:'uploads/'});
var mongo=require('mongodb');
var db = require('monk')('localhost/nodeblog');
/* GET users listing. */
router.get('/add', function(req, res, next) {
    var categories = db.get('categories');
    categories.find({},{},function (err,categories) {
        res.render('addpost',{
            'title': 'Add Post',
            'categories': categories
        });
    });
});
router.post('/add',upload.single('mainimage'),function(req, res, next) {
//Get Form Value
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;
    var author = req.body.author;
    var date = new Date();


    //Request image
    if(req.file)
    {
        var mainimage = req.file.filename;
    }
    else
    {
        var mainimage = 'noimage.jpg';
    }
    //Form Validation
    req.checkBody('title','Title is a required Field').notEmpty();
    req.checkBody('body','Body is a required Field').notEmpty();

    //Check errors
    var errors = req.validationErrors();
    if(errors){
        res.render('addpost',{
            'errors': errors,
            'title':title,
            'body':body
        });
    } else{
        var posts= db.get('post');
        posts.insert({
            "title":title,
            "body":body,
            "category":category,
            "date":date,
            "author":author,
            "mainimage": mainimage
        }, function (err,post) {
            if (err){
                res.send(err)
            }
            else{
                req.flash('success','Post Added');
                res.location('/');
                res.redirect('/');
            }

        });
    }

});
module.exports = router;
/**
 * Created by jmontemayor on 06/05/2016.
 */
