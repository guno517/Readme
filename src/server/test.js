const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use('/activity', (req, res) => {
  let sql = 'SELECT * FROM activity';

  connection.query(sql, function (err, result) {
    res.json({ new: result });
  });
})

router.get('/', function (req, res, next) {
  res.render('login');
});

//router.post()
app.use('/login', function (req, res, next) {
  let userId = req.body['id'];
  let userPw = req.body['pass'];
  connection.query('select * from member where id=\'' + userId + '\' and password=\'' + userPw + '\'', function (err, rows, fields) {
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

router.get('/', function (req, res, next) {
  res.render(join)
})

app.use('/join', function (req, res, next) {
  // let userId = req.body['id'];
  // let userPw = req.body['pass'];
  // let userPwRe = req.body['userPwRe'];
  // let college = req.body['college'];
  // let department = req.body['department'];
  // let student_number = req.body['student_number'];
  // let phone = req.body['phone'];
  let index = 3;
  let userId = "test1";
  let userPw = "test1";
  let userPwRe = "test1";
  let college = "test1";
  let department = "test1";
  let student_number = "123456789";
  let phone = "010-0000-1111";
  let authority = 0;
  if (userPw == userPwRe) {
    connection.query('insert into member values(?,?,?,?,?,?,?,?)', [index, userId, userPw, college, department, student_number, phone, null], function (err, rows, fields) {
      if (!err) {
        res.json({ user: rows });
      } else {
        res.send('err:' + err);
      }
    });
  } else {
    res.send("password is not match")
  }

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

  app.listen(5000, () => {
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
