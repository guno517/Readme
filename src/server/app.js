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

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);


  connection.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);

    }
  })
  connection.on('error', function(err){
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
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

  connection.query(sql, function(err, result){
    res.json({new: result});
  });
})

router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  //var userId = req.body['userId'];
  //var userPw = req.body['userPw'];
  let userId = "test";
  let userPw = "test";
  connection.query('select * from test_user where id=\'' + userId + '\' and pw=\'' + userPw + '\'', function (err, rows, fields) {
      if (!err) {
          if (rows[0]!=undefined) {
              res.send('id : ' + rows[0]['id'] + '<br>' +
                  'pw : ' + rows[0]['pw']);
          } else {
              res.send('no data');
          }

      } else {
          res.send('error : ' + err);
      }
  });
});

app.get('/home', function (req, res) {
  res.send('hello world')
})

app.listen(5000, () => {
  console.log('server connected!')
})




// connection.connect(function (err) {
//   if (err) {
//     console.log('error when connecting to db:', err);
//     setTimeout(handleDisconnect,2000);

//   } else {

//     connection.query("SELECT * FROM pledge", function (err, rows, fields) {
//       console.log(rows);
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
