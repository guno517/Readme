const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const crypto = require('crypto');

let db_config = require('../db');

let connection = mysql.createConnection(db_config)

//router.post()
router.post('/', function (req, res, next) {
  let userId = req.body['id'];
  let userPw = req.body['pass'];
  //let userId = 'thlee'
  //let userPw = '123'

  let key = 'readme1234'
  let algorithm = 'aes-128-cbc'
  // 암호화
  var cipher = crypto.createCipher(algorithm, key);    // Cipher 객체 생성
  cipher.update(userPw, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
  var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값

  //let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  //let hashPassword = crypto.createHash("sha512").update(userPw + salt).digest("hex");
  console.log(req.body)
  connection.query('select id,password,college,department,student_number,authority from member where id=\'' + userId + '\' and password=\'' + cipheredOutput + '\'', function (err, results) {
    if (!err) {
      if (results[0] != undefined) {
        res.json({ user: results });

      } else {
        res.send('no data');
      }
    } else {
      res.send('error : ' + err);
    }
  });
});

router.post('/findId', function (req, res, next) {
  let name = req.body['name'];
  //let name = '변건오'
  let sql = 'select * from member where name=?'

  connection.query(sql, [name], function (err, data) {
    if (!err) {
      res.send(data);
      console.log(data);
    } else {
      console.log(err);
    }
  })
})


module.exports = router;