const express = require('express');
const router = express.Router();
const mysql = require('mysql');

let db_config = require('../db');

let connection = mysql.createConnection(db_config)

router.get('/', function (req, res, next) {
    // let userId = req.body['id'];
    // let userPw = req.body['pass'];
    // let userPwCheck = req.body['userPwCheck'];
    // let name = req.body['name'];
    // let college = req.body['college'];
    // let department = req.body['department'];
    // let student_number = req.body['student_number'];
  
    let userId = "test1"
    let userPw = "test1"
    let userPwCheck = "test1"
    let name = "test"
    let college = "test"
    let department = "test"
    let student_number = 201611111
  
    if (userPw == userPwCheck) {
      connection.query('insert into member values(?,?,?,?,?,?,?,?)', ['', userId, userPw, name, college, department, student_number, ''], function (err, result) {
        if (!err) {
            res.send('회원가입성공');
            console.log(req.body);
        } else {
          res.send('error:' + err);
          console.log(err);
        }
      });
    } else {
      res.send("password is not match")
    }
  })

  
router.get('/check', function(req,res,next) { 
    //let userId = req.body['id'];
    let userId = "gggg";
    connection.query('select id from member where id=\'' + userId + '\'', function(err, data){
      if(!err){
        //console.log(data.length);
        if(data.length == 0){
          console.log("중복되는 ID없음");
          res.send("사용가능한 ID!");
          return true;
        } else {
          console.log("중복된 아이디가 있음");
          res.send("ID중복!")
          return false;
        }
      } else {
        console.log(err);
        res.send('err:' + err);
      }
    })
  })
  
  module.exports = router;