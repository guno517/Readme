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

    let turnout = result['turn_out'];
    let day1_1 = turnout[0];
    let day1_2 = turnout[1];
    let day2_1 = turnout[2];
    let day2_2 = turnout[3];
    let day3_1 = turnout[4];
    let day3_2 = turnout[5];

    let p1 = (day1_1 / total_voter) * 100;
    let p2 = (day1_2 / total_voter) * 100;
    let p3 = (day2_1 / total_voter) * 100;
    let p4 = (day2_2 / total_voter) * 100
    let p5 = (day3_1 / total_voter) * 100;
    let p6 = (day3_2 / total_voter) * 100;
    let final = p6;


    for (let i = 0; i < candidate.length; i++) {
        if (candidate[i] == '') break;
        let update_votes_sql = "update candidate set votes=? where number=? and collegeId=? and deptId=? and flag='정';"
        connection.query(update_votes_sql, [candidate[i], i + 1, collegeId, deptId], function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(update_votes_sql)
            }
        })
    }
    let result_existSql = 'select exists(select * from vote_result where collegeId=? and deptId=?)as success;'
    let insert_vote_result_sql = 'insert into vote_result values(?,?,?,?,?,?)'
    let update_vote_result_sql = 'update vote_result set total_voter=?, total_votes=?, invalid=? where collegeId=? and deptId=?'
    connection.query(result_existSql,[collegeId,deptId],function(err,results){
        if(results[0]['success']==0){
            connection.query(insert_vote_result_sql,['',collegeId,deptId,total_voter,total_votes,invalid],function(err,results){
                if(err){
                    console.log(err)
                } else {
                    console.log('vote_result insert');
                }
            })
        } else {
            connection.query(update_vote_result_sql, [total_voter, total_votes, invalid, collegeId, deptId], function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('vote_result update')
                }
            })
        }
    })

    let pp_existSql = 'select exists(select * from participation where collegeId=? and deptId=?)as success;'
    let insertsql = 'insert into participation values(?,?,?,?,?,?,?,?,?,?,?)'
    let updatesql = 'update participation set total_voter = ?, day1_1=?,day1_2=?,day2_1=?,day2_2=?,day3_1=?,day3_2=?,final=? where collegeId=? and deptId=?;'
    connection.query(pp_existSql, [collegeId, deptId], function (err, results) {
        if (results[0]['success'] == 0) {
            connection.query(insertsql, ['', collegeId, deptId, total_voter, p1, p2, p3, p4, p5, p6, final], function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    res.send({result:true})
                }
            })
        } else {
            connection.query(updatesql, [total_voter, p1, p2, p3, p4, p5, p6, final, collegeId, deptId], function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    res.send({result:true})
                }
            })
        }
    })
})

router.get('/test', function (req, res) {
    let collegeId = 2;
    let deptId = 0;
    let sql1 = 'select exists(select * from participation where collegeId=? and deptId=?)as success;'
    let sql2 = 'insert into participation values(?,?,?,?,?,?,?,?,?,?,?,?,?)'
    connection.query(sql1, [collegeId, deptId], function (err, results) {
        if (results[0]['success'] == 0) {
            connection.query('insert into participation (collegeId, deptId) values(?,?)', [collegeId, deptId], function (err, results) {
                console.log("success");
            })
        } else {
            connection.query()
        }
    })
})

module.exports = router;