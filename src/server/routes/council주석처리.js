/*
router.get('/', function (req, res) {
    console.log('/council_page접속')
    let sql = 'SELECT * FROM council_page join pledge_rate where council_page.collegeId="총학생회";'
    connection.query(sql, (err, result) => {
        if (!err) {
            res.json({ council_page: result });
        } else {
            res.send(err)
        }
    })
});


router.get('/:collegeId', function (req, res) {
    console.log('/:collegeId접속')
    let collegeId = req.params.collegeId;
    console.log(collegeId)
    let sql = 'SELECT * FROM council_page join pledge_rate where collegeId=? and deptId is null;'
    connection.query(sql, [collegeId], (err, result) => {
        if (!err) {
            res.json({ council_pagecollegeId: result });
        } else {
            res.send(err)
        }
    })
})
*/

/*
router.get('/editor', function (req, res) {
    console.log("총학 이행인증 게시글 db에 접근");
    //let img = req.body['img'];
    //let title = req.body['title'];
    //let content = req.body['content'];
    //let writer = req.body['writer'];
    //let fulfilled_date = req.body['fulfilled_date'];
    //let time = req.body['time'];
    let view = 1;

     let img = 'https://t1.daumcdn.net/cfile/blog/2455914A56ADB1E315'
     let title = 'test';
     let content = 'test';
     let fulfilled_date = '2020-09-30';
     let writer = '총학생회';
     let time = '2020-10-04';

    let sql = 'insert into fulfilled_pledge values(?,?,?,?,?,?,?,?,?,?)'

    connection.query(sql, ['', '총학생회','',img, title, content, fulfilled_date, writer, time, view], function (err, results) {
        if (!err) {
            console.log('총학 이행인증 게시글 db에 저장!');
            res.send('총학 게시글 db 저장!');
            res.json({'총학생회': results});
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

router.get('/editor/:collegeId', function (req, res) {
    console.log("단과대학 이행인증 게시글 db에 접근");
    let collegeId = req.params.collegeId;
    //let img = req.body['img'];
    //let title = req.body['title'];
    //let content = req.body['content'];
    //let writer = req.body['writer'];
    //let fulfilled_date = req.body['fulfilled_date'];
    //let time = req.body['time'];
    let view = 1;

     let img = 'https://t1.daumcdn.net/cfile/blog/2455914A56ADB1E315'
     let title = 'IT대학 test';
     let content = 'IT대학 test';
     let fulfilled_date = '2020-09-30';
     let writer = 'IT대학';
     let time = '2020-10-04';

    let sql = 'insert into fulfilled_pledge values(?,?,?,?,?,?,?,?,?,?)'

    connection.query(sql, ['', collegeId,'',img, title, content, fulfilled_date, writer, time, view], function (err, results) {
        if (!err) {
            console.log('단과대학 이행인증 게시글 db에 저장!');
            res.send('단과대학 게시글 db 저장!');
            res.json({'단과대학 학생회': results});
        } else {
            console.log(err);
            res.send(err);
        }
    })
})
*/

/*
router.get('/list', function (req, res) {
   console.log('list 접속')
   let collegeId = req.params.collegeId;
   console.log(req.body);
   let sql = "SELECT * FROM pledge_list where collegeId='총학생회'";
   connection.query(sql, function (err, results) {
       if (!err) {
           res.json({ list: results });
       } else {
           console.log(err);
           res.send(err);
       }
   });
});


router.get('/list/:collegeId', function (req, res) {
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
*/