const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const cors = require('cors');

const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const noticeRouter = require('./routes/notice');
const councilRouter = require('./routes/council');
const pledgeListRouter = require('./routes/pledgeList');
const candidateRouter = require('./routes/candidate');
const codeTableRouter = require('./routes/codeTable');
const voteResultRouter = require('./routes/vote');


app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({
  limit: "50mb"
}
));
app.use(express.urlencoded({ 
  limit:"50mb",
  extended: false 
}));

let db_config = require('./db');

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

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/notice', noticeRouter);
app.use('/council', councilRouter);
app.use('/pledgeList', pledgeListRouter);
app.use('/candidate', candidateRouter);
app.use('/codeTable', codeTableRouter);
app.use('/vote', voteResultRouter);


app.get('/', function (req, res) {
  res.send('Running readme Project server')
})

app.listen(3000, () => {
  console.log('server connected!')
})