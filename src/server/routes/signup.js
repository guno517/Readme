const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const crypto = require('crypto');

let key = 'readme1234'
// let input = 'test1';

// let algorithm = 'aes-128-cbc'


// // 암호화
// var cipher = crypto.createCipher(algorithm, key);    // Cipher 객체 생성
// cipher.update(input, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
// var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값

// // 복호화
// var decipher = crypto.createDecipher(algorithm, key); // Decipher 객체 생성
// decipher.update(cipheredOutput, 'base64', 'utf8');   // 인코딩 방식에 따라 복호화
// var decipheredOutput = decipher.final('utf8');       // 복호화된 결과 값

let db_config = require('../db');

let connection = mysql.createConnection(db_config)

router.post('/', function (req, res, next) {
  let userId = req.body['id'];
  let userPw = req.body['pass'];
  let userPwCheck = req.body['userPwCheck'];
  let name = req.body['name'];
  let college = req.body['college'];
  let department = req.body['department'];
  let student_number = req.body['student_number'];

  // let userId = "test1"
  // let userPw = "test1"
  // let userPwCheck = "test1"
  // let name = "test"
  // let college = "test"
  // let department = "test"
  // let student_number = 201611111

  let algorithm = 'aes-128-cbc'

  // 암호화
  var cipher = crypto.createCipher(algorithm, key);    // Cipher 객체 생성
  cipher.update(userPw, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
  var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값

  // 복호화
  var decipher = crypto.createDecipher(algorithm, key); // Decipher 객체 생성
  decipher.update(cipheredOutput, 'base64', 'utf8');   // 인코딩 방식에 따라 복호화
  var decipheredOutput = decipher.final('utf8');       // 복호화된 결과 값

  //let hash = crypto.createHash('sha256').update(userPw).digest('base64');

  console.log(cipheredOutput);
  console.log(decipheredOutput);


  if (userPw == userPwCheck) {
    connection.query('insert into member values(?,?,?,?,?,?,?,?)', ['', userId, cipheredOutput, name, college, department, student_number, 1], function (err, result) {
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


router.post('/check', function (req, res, next) {
  let userId = req.body['id'];
  //let id = "test";
  connection.query('select count(id) as flag from member where `id`=?', [userId], function (err, data) {
    if (!err) {
      console.log(data[0]);
      console.log(data[0].flag)
      res.json(data[0]);
    } else {
      console.log(err);
      res.send('err:' + err);
    }
  })
})


// //수정해야함
// app.use('/update', function (req, res, next) {
//   let index = 3;
//   let userId = "test1";
//   let userPw = "test1";
//   let userPwNew = "test123"
//   let userPwRe = "test1";
//   let college = "test1";
//   let department = "test1";
//   let student_number = "123456789";
//   let phone = "010-0000-1111";
//   let authority = 0;

//   connection.query('select * from member where id=? and password=?', [userId, userPw], function (err, rows, fields) {
//     if (!err) {
//       console.log("select success");
//       if (rows[0] != undefined) {
//         connection.query('update member set password=? where id=?', [userPwNew, userId], function (err, rows, fields) {
//           if (!err) {
//             res.send("password change success");
//           } else {
//             res.send('error:' + err);
//           }
//         })
//       } else {
//         res.send('no data');
//       }
//     } else {
//       res.send("error: " + err);
//     }
//   })
// })

module.exports = router;