var express = require('express');
var path = require('path');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var users = [

]
app.set('view engine','ejs');
app.set('views',path.resolve('views'));
//注册
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/signup',function (req,res) {
    res.render('signup',{title:'注册'});
});
app.post('/signup',function (req,res) {
  users.push(req.body)
    res.redirect('/signin')

});
//登录
app.get('/signin',function (req,res) {
    res.render('signin',{title:'登录'});
});
app.post('/signin',function (req,res) {
    var user = req.body;
      for(var i= 0;i<users.length;i++){
          if(users[i].username==user.username&&users[i].password==user.password){
              res.redirect('/welcome');return;
          }

      }
    res.redirect('/signup')
});

//欢迎页
app.get('/welcome',function (req,res) {
    res.render('welcome',{title:'欢迎'});
});
app.listen(1000);