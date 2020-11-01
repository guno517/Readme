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
    limit:"50mb",
    extended: false 
}));

router.get('/', function (req, res) {
    console.log('pledgeList 접속')
    let collegeId = req.params.collegeId;
    console.log(req.body);
    let sql = "SELECT * FROM pledge_list where collegeId='총학생회'";
    connection.query(sql, function (err, results) {
        if (!err) {
            console.log('총학생회 이행 리스트')
            res.json({ list: results });
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

router.get('/detail/:index', function (req, res) {
    let index = req.params.index;
    let indexInt = parseInt(index);
    let sql = "SELECT * FROM pledge_list where `index`=?";
    connection.query(sql, [indexInt], function (err, rows, fields) {
        if (!err) {
            res.json({ detail: rows });
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

router.get('/:collegeId', function (req, res) {
    let collegeId = req.params.collegeId;
    let index = req.params.index;
    let sql = 'select * from pledge_list where collegeId=? and deptId is null';
    connection.query(sql,[collegeId], function(err, results){
        if(!err){
            res.json({collegelist: results});
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

router.get('/:collegeId/:deptId', function (req, res) {
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let index = req.params.index;
    let sql = 'select * from pledge_list where collegeId=? and deptId=?';
    connection.query(sql,[collegeId,deptId], function(err, results){
        if(!err){
            res.json({deptlist: results});
        } else {
            console.log(err);
            res.send(err);
        }
    })
})


module.exports = router;