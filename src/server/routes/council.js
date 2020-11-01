const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const app = express();

let db_config = require('../db');

let connection = mysql.createConnection(db_config);

app.use(express.json({
    limit: "50mb"
}));
app.use(express.urlencoded({
    limit: "50mb",
    extended: false
}));

router.get('/list', function(req, res){
    let sql = 'select * from pledge_list; select * from fulfilled_pledge;';
    connection.query(sql, function(err, results){
        if(!err){
            res.json({deptlist: results});
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

router.get('/list/:collegeId/:deptId', function (req, res) {
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let index = req.params.index;
    //@num:=@num+1 as rownum, collegeId, deptId, img, pledge_title, pledge_content, fulfilled_date, writer, time
    let sql = 'select * from pledge_list where collegeId=? and deptId=?; select * from fulfilled_pledge where `collegeId`=? and `deptId`=?;';
    connection.query(sql,[collegeId,deptId,collegeId, deptId], function(err, results){
        if(!err){
            res.json({deptlist: results});
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

router.get('/list/:collegeId/:deptId/:index', function (req, res) {
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let index = req.params.index;
    //set @num:=0; select @num:=@num+1 as `index`, collegeId, deptId, img, pledge_title, pledge_content 
    let sql = 'select * from fulfilled_pledge where collegeId=? and deptId=? and `index`=?';
    connection.query(sql,[collegeId,deptId,index], function(err, results){
        if(!err){
            res.json({fulfilled_list: results});
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

//안쓰는듯
router.post('/check/:collegeId/:deptId', function(req, res){
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let pledge_title = req.body['pledge_title'];
    let fulfillment = req.body['fulfillment'];
    let sql = 'insert into pledge_list values(?,?,?,?)';
    connection.query(sql,[collegeId,deptId,pledge_title,fulfillment], function(err, results){
        if(!err){
            res.json({checkList: results});
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

router.post('/insert/:collegeId/:deptId', function (req, res) {
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let img = req.body['img'];
    let title = req.body['title'];
    let content = req.body['content'];
    let writer = req.body['writer'];
    let fulfilled_date = req.body['fulfilled_date'];
    let time = req.body['time'];
    let view = 1;

    //  let img = 'https://t1.daumcdn.net/cfile/blog/2455914A56ADB1E315'
    //  let title = '총학생회 test';
    //  let content = '총학생회 test';
    //  let fulfilled_date = '2020-09-30';
    //  let writer = '총학생회';
    //  let time = '2020-10-04';

    let sql = 'insert into fulfilled_pledge values(?,?,?,?,?,?,?,?,?,?,?); update pledge_list set fulfillment=? where pledge_title=?;'

    connection.query(sql, ['', collegeId, deptId, img, title, content, fulfilled_date, writer, time, view,'T','T'], function (err, results) {
        if (!err) {
            res.json({'이행 인증': results});
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

router.post('/update/:collegeId/:deptId/:index', function(req, res){
    let index = req.params.index;
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let img = req.body['img'];
    let title = req.body['title'];
    let content = req.body['content'];
    let writer = req.body['writer'];
    let fulfilled_date = req.body['fulfilled_date'];
    let time = req.body['time'];
    let view = 1;

    let sql = 'update fulfilled_pledge set `img`=?, `title=`?, `contentc`=?, `fulfilled_date`=?, `time`=? where collegeId=? and deptId=? and `index`=?';
    connection.query(sql,[img,title,content,fulfilled_date,time,collegeId,deptId,index],function(err, results){
        if(!err){
            res.send('수정완료!');
        } else {
            res.send(err);
            console.log(err);
        }
    })
})

router.get('/delete/:collegeId/:deptId/:index', (req, res) => {
    let index = req.params.index;
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let sql = "delete from fulfilled_pledge where collegeId=? and deptId=? and `index`=? "
    connection.query(sql,[collegeId, deptId, index],function(err, rows, fields){
        if(!err){   
            res.send('delete success');
        } else {
            res.send(err);
            console.log(err);
        }
    })
})

router.get('/:collegeId/:deptId', function (req, res) {
    console.log('deptId 접속')
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let sql1 = 'SELECT * FROM pledge_rate where `collegeId`=? and `deptId`=?; select * from fulfilled_pledge where `collegeId`=? and `deptId`=?;';
    connection.query(sql1 , [collegeId,deptId,collegeId,deptId], (err, results) => {
        if (!err) {
            res.json({'council':results});
        } else {
            res.send(err)
        }
    })
})



module.exports = router;