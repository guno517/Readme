const express = require('express');
const router = express.Router();
const mysql = require('mysql');

let db_config = require('../db');

let connection = mysql.createConnection(db_config)


//router.post()
router.post('/', function (req, res, next) {
    let userId = req.body['id'];
    let userPw = req.body['pass'];
    console.log(req.body)
    connection.query('select id,college,department,student_number,authority from member where id=\'' + userId + '\' and password=\'' + userPw + '\'', function (err, rows, fields) {
      if (!err) {
        if (rows[0] != undefined) {
          res.json({ user: rows });
        } else {
          res.send('no data');
        }
  
      } else {
        res.send('error : ' + err);
      }
    });
  });

router.get('/findId',function (req, res, next){
  //let name = req.body['name'];
  
  let sql = 'select id from member where name=?'
})

module.exports = router;