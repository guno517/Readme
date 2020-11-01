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
    let sql = "select * from candidate order by number asc, flag desc";
    connection.query(sql, function(err, results){
        if(!err){
            res.send({candidate:results});
        } else {
            res.send(err)
            console.log(err);
        }
    })
})

router.post('/update/:index', (req, res) => {
    
    let index = req.params.index;
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let number = req.body['number']; // 음 바꿔야 할거 같은데
    let img = req.body['img'];
    let name = req.body['name'];
    let college = req.body['college'];
    let department = req.body['department'];
    let grade = req.body['grade'];
    let career = req.body['career'];
    let election_pledge = req.body['election_pledge'];
    let view = 1;

    // let number = req.params.number;
    // let collegeId = req.params.collegeId;
    // let deptId = req.params.deptId;
    // let img = 'https://t1.daumcdn.net/cfile/blog/2455914A56ADB1E315'
    // let name = 'test'
    // let college = 'test'
    // let department = 'test'
    // let grade = 'test'
    // let career = 'test'
    // let election_pledge = 'test'
    // let view = 1;

    // let img = 'https://t1.daumcdn.net/cfile/blog/2455914A56ADB1E315'
    // let attachment = '';
    // let title = 'readme';
    // let content = 'readme';
    // let writer = 'readme';
    // let time = '2020-10-04';
    // let view = 1;

    let sql = "update candidate set `number`=?, `img`=?, `name`=?, `college`=?, `department`=?, `grade`=?, `career`=?, `election_pledge`=? where `index`=?"

    connection.query(sql,[number, img, name, college, department, grade, career, election_pledge, index],function(err, rows, fields){
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
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let sql = "delete from candidate where `index`=? "
    connection.query(sql,[index],function(err, rows, fields){
        if(!err){   
            res.json({update:rows})
        } else {
            res.send(err);
            console.log(err);
        }
    })
})

router.post('/insert/:collegeId/:deptId', function (req, res) {
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let number = req.body['number'];
    let img = req.body['img'];
    let name = req.body['name'];
    let college = req.body['college'];
    let department = req.body['department'];
    let grade = req.body['grade'];
    let career = req.body['career'];
    let election_pledge = req.body['election_pledge'];
    let flag = req.body['flag']
    let sql = 'insert into candidate values(?,?,?,?,?,?,?,?,?,?,?,?,?,?);' 
        connection.query(sql , ['',number,img,name,collegeId,deptId,college,department,grade,career,election_pledge,'F','',flag], (err, results) => {
            if (!err) {
                console.log('입후보자 등록 완료!');
                res.send(results);
            } else {
                res.send(err)
            }
        })
    
})




module.exports = router;