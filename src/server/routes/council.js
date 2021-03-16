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

router.post('/insert/pledge_list/:collegeId/:deptId', function(req, res){
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let councilList = req.body['councilList'];
    let length = councilList.length;
    console.log(length)
    let sql1 = 'update pledge_rate set total_pledge = total_pledge+? where collegeId=? and deptId=?;'
    connection.query(sql1,[length,collegeId, deptId],function(err, results){
        if(err){
            console.log(err);
        } else {
            res.send({result:true});
        }
    })
    for (let i = 0; i<councilList.length;i++){
        let sql = 'insert into pledge_list values(?,?,?,?,?);'; // total_pledge(pledge_rate테이블 업데이트)
        connection.query(sql,['',collegeId,deptId,councilList[i],'F'], function(err, results){
            if (err) {
                console.log(err);
            } else {
                return true;
            }
        })
    }
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

    let sql = 'insert into fulfilled_pledge values(?,?,?,?,?,?,?,?,?,?,?); update pledge_list set fulfillment=? where pledge_title=?; update pledge_rate set fulfilled_pledge=fulfilled_pledge+1 where collegeId=? and deptId=?;'

    connection.query(sql, ['', collegeId, deptId, img, title, content, fulfilled_date, writer, time, view,'T','T',title,collegeId,deptId], function (err, results) {
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

router.post('/delete', (req, res) => {
    let index = req.body['index'];
    let collegeId = req.body['collegeId'];
    let deptId = req.body['deptId'];
    let title = req.body['title'];
    console.log(collegeId)
    console.log(deptId)

    let sql = "delete from fulfilled_pledge where collegeId=? and deptId=? and `index`=?; update pledge_rate set fulfilled_pledge=fulfilled_pledge-1 where collegeId=? and deptId=?; update pledge_list set fulfillment=? where pledge_title=?"
    connection.query(sql,[collegeId, deptId, index,collegeId, deptId,'F',title],function(err, rows, fields){
        if(!err){
            res.send({result:true})
        } else {
            res.send(err);
            console.log(err);
        }
    })
})

router.get('/:collegeId/:deptId', function (req, res) {
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let sql1 = 'SELECT collegeId, deptId, total_pledge,fulfilled_pledge, (fulfilled_pledge/total_pledge)*100 as fulfillment_rate FROM readme.pledge_rate where `collegeId`=? and `deptId`=?; select * from fulfilled_pledge where `collegeId`=? and `deptId`=?;';
    connection.query(sql1 , [collegeId,deptId,collegeId,deptId], (err, results) => {
        if (!err) {
            res.json({'council':results});
        } else {
            res.send(err)
        }
    })
})



module.exports = router;