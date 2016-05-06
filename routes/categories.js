var express = require('express');
var router = express.Router();
var mongo=require('mongodb');
var db = require('monk')('localhost/nodeblog');
/* GET users listing. */
router.get('/add', function(req, res, next) {
        res.render('addcategory',{
            'title': 'Add Category'            
        });
});
router.post('/add',function(req, res, next) {
//Get Form Value
    var name = req.body.name;

    //Form Validation
    req.checkBody('name','Name is a required Field').notEmpty();
       //Check errors
    var errors = req.validationErrors();
    if(errors){
        res.render('addpost',{
            'errors': errors,
            'title':title,
            'body':body
        });
    } else{
        var categories= db.get('categories');
        categories.insert({
            "name":name

        }, function (err,post) {
            if (err){
                res.send(err)
            }
            else{
                req.flash('success','Category Added');
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
/**
 * Created by jmontemayor on 06/05/2016.
 */
