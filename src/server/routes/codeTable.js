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

router.get('/', function(req, res){
    let sql = 'select * from codeTable';
    connection.query(sql, function(err, results){
        if(!err){
            res.json({'codeTable':results});
        } else {
            res.send(err);
        }
    })
})

router.get('/:collegeId', function(req, res){
    let collegeId = req.params.collegeId;
    let sql = 'select * from codeTable where collegeId=?';
    connection.query(sql, [collegeId], function(err, results){
        if(!err){
            res.json({'codeTable':results});
        } else {
            res.send(err);
        }
    })
})

router.get('/:collegeId/:deptId', function(req, res){
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let sql = 'select * from codeTable where collegeId=? and deptId=?';
    connection.query(sql, [collegeId, deptId], function(err, results){
        if(!err){
            res.json({'codeTable':results});
        } else {
            res.send(err);
        }
    })
})

module.exports = router;