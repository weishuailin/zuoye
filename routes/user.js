var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');

router.use(session({
    resave:true,//每次请求的时候都会重新保存session
    saveUninitialized:true,//不管用不用都 进行初始化。
    secret:'zfpx' //加密cookie
}));
// 保存所有的用户
//注册
router.get('/signup',function(req,res){
    res.render('signup',{title:'用户注册',error:req.session.error});

});


router.post('/signup',function(req,res){
    var user = req.body;
  fs.readFile('./user.json',function (err,users) {
      users = JSON.parse(users);
      var existUser = users.find(function(item){
          return user.username == item.username;
      });
       if(existUser){
           req.session.error='用户名存在';
           res.redirect('/user/signup');
       }else {
           req.session.error='';
           users.push(user);
           fs.writeFile('./user.json',JSON.stringify(users),function () {
               res.redirect('/user/signin');
           });
       }
    })
});
//登录
router.get('/signin',function(req,res){
    res.render('signin',{title:'用户登录'});
});
router.post('/signin',function(req,res){
    var user = req.body;
     fs.readFile('./user.json','utf-8',function (err,users) {
         users = JSON.parse(users);
         var existUser = users.find(function(item){
             return user.username == item.username && user.password == item.password;
         });
         console.log(user);
         console.log(existUser);
         if(existUser){
             req.session.username = existUser.username;
             res.redirect('/user/welcome');
         }else{
             res.redirect('/user/signin');
         }

     })

});
//欢迎页
router.get('/welcome',function(req,res){
    res.render('welcome',{title:'欢迎页',username:req.session.username});
});
module.exports = router;