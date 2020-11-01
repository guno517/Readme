const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use((req, res, next) => { 
//   res.header("Access-Control-Allow-Origin", "*") 
//   res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if(req.method === 'OPTIONS'){
//       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); 
//       return res.status(200).json({});
//   }
//   next();
// })

let db_config = {
  host: "readme.crmkq7ncuwo3.ap-northeast-2.rds.amazonaws.com",
  user: "readme",
  password: "readme1234",
  database: "readme"
};

let connection = mysql.createConnection(db_config);

function handleDisconnect() {
  connection = mysql.createConnection(db_config);


  connection.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);

    }
  })
  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  })

}

handleDisconnect();

app.use('/notice', (req, res) => {
  let sql = 'SELECT  * FROM notice';

  connection.query(sql, function (err, result) {
    res.json({ notice: result });
  });
})

app.use('/insert/notice', (req, res) => {
  console.log("게시글 db에 저장");
  let img = req.body['img'];
  let attachment = req.body['attachment'];
  let title = req.body['title'];
  let content = req.body['content'];
  let writer = req.body['writer'];
  let time = req.body['time'];
  connection.query('insert into notice values(?,?,?,?,?,?,?,?)', ['', '', '', title, content, writer, time, 1], function (err, rows, fields) {
    res.redirect('/notice'); // or 상세페이지
  })
})

app.use('/update/notice', (req, res) => {
  console.log("게시글 수정 완료");
  connection.query('update')
})

app.use('delete/notice', (req, res) => {
  console.log('게시글 삭제 완료');

})

// 이태희 검색기능 추가
app.use('/search', function (req, res, next) {
  let title = req.body['content']
  connection.query("select * from notice where title Like '"+title+"'", function (err, rows, fields) {
      res.json({ notice_search: rows });
  });
});

app.use('/activity', (req, res) => {
  let sql = 'SELECT * FROM activity';

  connection.query(sql, function (err, result) {
    res.json({ new: result });
  });
})

router.get('/login', function (req, res, next) {
  res.render(longin);
})

//router.post()
app.use('/login', function (req, res, next) {
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

function checkId(userId) {
  if (checkId) {
    return true;
  } else {
    return false;
  }
}

app.use('/signup', function (req, res, next) {
  // let userId = req.body['id'];
  // let userPw = req.body['pass'];
  // let userPwCheck = req.body['userPwCheck'];
  // let name = req.body['name'];
  // let college = req.body['college'];
  // let department = req.body['department'];
  // let student_number = req.body['student_number'];

  let userId = "test1"
  let userPw = "test1"
  let userPwCheck = "test1"
  let name = "test"
  let college = "test"
  let department = "test"
  let student_number = 201611111

  if (userPw == userPwCheck) {
    connection.query('insert into member values(?,?,?,?,?,?,?,?)', ['', userId, userPw, name, college, department, student_number, ''], function (err, result) {
      if (!err) {
          res.send('회원가입성공');
          console.log(req.body);
      } else {
        res.send('error:' + err);
        console.log(err);
      }
    });
  } else {
    res.send("password is not match")
  }
})

app.use('/signup/check', function(req,res,next) { 
  //let userId = req.body['id'];
  let userId = "gggg";
  connection.query('select id from member where id=\'' + userId + '\'', function(err, data){
    if(!err){
      //console.log(data.length);
      if(data.length == 0){
        console.log("중복되는 ID없음");
        res.send("사용가능한 ID!")
      } else {
        console.log("중복된 아이디가 있음");
        res.send("ID중복!")
      }
    } else {
      console.log(err);
      res.send('err:' + err);
    }
  })
})

router.get('/', function (req, res, next) {
  res.render('password-change');
})

app.use('/update', function (req, res, next) {
  let index = 3;
  let userId = "test1";
  let userPw = "test1";
  let userPwNew = "test123"
  let userPwRe = "test1";
  let college = "test1";
  let department = "test1";
  let student_number = "123456789";
  let phone = "010-0000-1111";
  let authority = 0;

  connection.query('select * from member where id=? and password=?', [userId, userPw], function (err, rows, fields) {
    if (!err) {
      console.log("select success");
      if (rows[0] != undefined) {
        connection.query('update member set password=? where id=?', [userPwNew, userId], function (err, rows, fields) {
          if (!err) {
            res.send("password change success");
          } else {
            res.send('error:' + err);
          }
        })
      } else {
        res.send('no data');
      }
    } else {
      res.send("error: " + err);
    }
  })
})

app.get('/home', function (req, res) {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('server connected!')
})




// connection.connect(function (err) {
//   if (err) {
//     console.log('error when connecting to db:', err);
//     setTimeout(handleDisconnect,2000);

//   } else {

//     connection.query("SELECT * FROM pledge", function (err, rows, fields) {
//       connection.end();
//     })

//     app.use('/db', (req, res) => {
//       let sql = 'SELECT  * FROM pledge';

//       connection.query(sql, function (err, result) {
//         res.json({ pledge: result });
//       });
//     })
//   }
// });
