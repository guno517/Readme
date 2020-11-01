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


router.get('/result', function (req, res) {
    let sql = "select distinct @num:=@num+1 as id, candidate.img, candidate.college, candidate.department, candidate.collegeId, candidate.deptId, candidate.number, candidate.name, candidate.votes, vote_result.total_voter,vote_result.total_votes, vote_result.invalid, (votes/(total_votes-invalid))*100 as votePercent, (total_voter-total_votes) as nonVotes from candidate, vote_result where candidate.flag='정' and candidate.collegeId=vote_result.collegeId and candidate.deptId=vote_result.deptId order by number asc;"
    connection.query(sql, function (err, results) {
        if (!err) {
            res.json({ vote_result: results })
        } else {
            res.send(err);
            console.log(err);
        }
    })
})


router.get('/participation', function (req, res) {
    let sql = 'select * from participation'
    connection.query(sql, function (err, results) {
        if (!err) {
            res.json({ participation: results })
        } else {
            res.send(err);
            console.log(err);
        }
    })
})

router.post('/insert/result', function (req, res) {

    let collegeId = req.body['collegeId'];
    let deptId = req.body['deptId'];
    let result = req.body['result'];
    let total_voter = result['voter'];
    let candidate = result['candidate'];
    let invalid = result['invalid'];
    let total_votes = result['total_votes'];

    /*
    console.log(result['voter']);
    console.log(result['candidate'])
    console.log(result['candidate'][0])
    console.log(result['invalid'])
    console.log(result['total_votes'])
    */

    // let collegeId = 7;
    // let deptId = 0;
    // let total_voter = 1200;
    // let total_votes = 670;
    // let candidate = [312,178];
    // let invalid = 25;

    let turnout = result['turn_out'];
    let day1_1 = turnout[0];
    let day1_2 = turnout[1];
    let day2_1 = turnout[2];
    let day2_2 = turnout[3];
    let day3_1 = turnout[4];
    let day3_2 = turnout[5];

    let p1 = (day1_1/total_voter)*100;
    let p2 = (day1_2/total_voter)*100;
    let p3 = (day2_1/total_voter)*100;
    let p4 = (day2_2/total_voter)*100
    let p5 = (day3_1/total_voter)*100;
    let p6 = (day3_2/total_voter)*100;
    let final = p6;


    for(let i = 0; i<candidate.length; i++){
        if(candidate[i]=='') break;
        let sql = 'update candidate set votes=? where number=? and collegeId=? and deptId=? and flag="정";'
        connection.query(sql, [candidate[i], i+1, collegeId, deptId], function (err, results) {
            if(err){
                console.log(err);
            }
        })
    }
    let sql1 = 'update vote_result set total_voter=?, total_votes=?, invalid=? where collegeId=? and deptId=?'
    connection.query(sql1,[total_voter, total_votes, invalid, collegeId, deptId],function(err,resukts){
        if(err){
            console.log(err);
        }
    })
    let sql2 ='update participation set total_voter = ?, day1_1=?,day1_2=?,day2_1=?,day2_2=?,day3_1=?,day3_2=?,final=? where collegeId=? and deptId=?;'
    connection.query(sql2, [total_voter,p1,p2,p3,p4,p5,p6,final,collegeId,deptId], function (err, results) {
        if(err){
            console.log(err);
        }
    })
})


router.get('/insert/participation', function (req, res) {
    /*
    let collegeId = req.params.collegeId;
    let deptId = req.params.deptId;
    let total_voter = req.body['total_voter'];
    let day1_1 = req.body.['day1_1']
    let day1_2 = req.body.['day1_2']
    let day2_1 = req.body.['day2_1']
    let day2_2 = req.body.['day2_2']
    let day3_1 = req.body.['day3_1']
    let day3_2 = req.body.['day3_2']

    let p1 = (day1_1/total_voter)*100;
    let p2 = ((day1_1+day1_2)/total_voter)*100;
    let p3 = ((day1_1+day1-2+day2-1)/total_voter)*100;
    let p4 = ((day1_1+day1_2+day2_1+day2_2)/total_voter)*100
    let p5 = ((day1_1+day1_2+day2_1+day2_2+day3_1)/total_voter)*100;
    let p6 = ((day1_1+day1_2+day2_1+day2_2+day3_1+day3_2)/total_voter)*100;

    let final = p6;
    */
    let collegeId = 1;
    let deptId = 2;
    let total_voter = 390;
    let day1_1 = 24;
    let day1_2 = 31;
    let day2_1 = 46;
    let day2_2 = 61;
    let day3_1 = 41;
    let day3_2 = 41;
    let p1 = (day1_1/total_voter)*100;
    let p2 = ((day1_1+day1_2)/total_voter)*100;
    let p3 = ((day1_1+day1_2+day2_1)/total_voter)*100;
    let p4 = ((day1_1+day1_2+day2_1+day2_2)/total_voter)*100
    let p5 = ((day1_1+day1_2+day2_1+day2_2+day3_1)/total_voter)*100;
    let p6 = ((day1_1+day1_2+day2_1+day2_2+day3_1+day3_2)/total_voter)*100;

    let final = p6;
    console.log(p6);

    sql = 'update participation set total_voter=?, day1_1=?,day1_2=?,day2_1=?,day2_2=?,day3_1=?,day3_2=?,final=? where `collegeId`=? and `deptId`=?';

    connection.query(sql, [total_voter, p1,p2,p3,p4,p5,p6,final,collegeId,deptId], function (err, results) {
        if (!err) {
            res.json({ participation: results })
        } else {
            res.send(err);
            console.log(err);
        }
    })
})



module.exports = router;