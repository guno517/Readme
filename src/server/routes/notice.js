const express = require('express');
const router = express.Router();
const mysql = require('mysql');

let db_config = require('../db');

let connection = mysql.createConnection(db_config);

router.get('/', function (req, res) {
    //let sql = 'SELECT * FROM notice'; // 페이지 당 10개만 보여주기 limit....
    let sql = "select * from notice order by `index` desc;"
    connection.query(sql, (err, result) => {
        if(!err){
            res.json({ notice: result });
        } else {
            res.send(err)
        }
    })
});

router.get('/detail/:index', (req, res) => {
    let index = req.params.index;
    let indexInt = parseInt(index);
    let sql = "SELECT * FROM notice where index=?";
    connection.query('SELECT * FROM notice where `index`=?', [indexInt], function(err, rows, fields){
        if(!err){
            res.json({detail: rows});
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

router.post('/insert', (req, res) => {
    console.log("게시글 db에 저장");
    let img = req.body['img'];
    let attachment = req.body['attachment'];
    let title = req.body['title'];
    let content = req.body['content'];
    let writer = req.body['writer'];
    let time = req.body['time'];

    // let img = 'https://t1.daumcdn.net/cfile/blog/2455914A56ADB1E315'
    // let attachment = '';
    // let title = 'readme';
    // let content = 'readme';
    // let writer = 'readme';
    // let time = '2020-10-04';
    let view = 1;

    connection.query('insert into notice values(?,?,?,?,?,?,?,?)', ['', img, attachment, title, content, writer, time, view], function (err, rows, fields) {
        if(!err){
            res.json({insert:rows}); // or 상세페이지   
        } else {
            res.send(err);
        }
    });
});

router.post('/update/:index', (req, res) => {
    let index = req.params.index;
    let img = req.body['img'];
    let attachment = req.body['attachment'];
    let title = req.body['title'];
    let content = req.body['content'];
    let writer = req.body['writer'];
    let time = req.body['time'];
    let view = 1;

    // let img = 'https://t1.daumcdn.net/cfile/blog/2455914A56ADB1E315'
    // let attachment = '';
    // let title = 'readme';
    // let content = 'readme';
    // let writer = 'readme';
    // let time = '2020-10-04';
    // let view = 1;

    let sql = "update notice set `img`=?, `attachment`=?, `title`=?, `content`=?, `writer`=?, `time`=? where `index`="+mysql.escape(req.params.index);

    connection.query(sql,[img, attachment, title, content, writer, time, index],function(err, rows, fields){
        if(!err){   
            res.json({update:rows})
        } else {
            res.send(err);
            console.log(err);
        }
    })
})

router.get('/delete/:index', (req, res) => {
    let index = req.params.index;
    sql = 'delete from notice where `index`=?'
    connection.query(sql, [index], function(err, result){
        if(!err){
            res.send('삭제 완료');
        } else {
            res.send(err);
        }
    })
})

// 이태희 검색기능 추가
router.post('/search', function (req, res, next) {
    let title = req.body['title']
    //let title = 'test입니다.'
    connection.query("select * from notice where title Like '%"+title+"%' order by `index` desc" , function (err, rows, fields) {
      if(!err){
        res.json({ notice_search: rows });
      } else {
        res.send(err);
      }
    });
  });

module.exports = router;