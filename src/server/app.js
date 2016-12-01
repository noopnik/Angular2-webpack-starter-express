const http = require('http');
const express = require('express');
const app = express();
const ejwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

app.use(require('morgan')('short'));

(function() {
  // Step 1: Create & configure a webpack compiler
  const webpack = require('webpack');
  const webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../../config/webpack.dev')();
  const compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
})();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// app.get("/", function(req, res) {
//   let pathFile = path.join(__dirname, '../index.html');
//   console.log(pathFile);
//   res.sendFile(__dirname + '/index.html');
// });

app.post('/api/user/login', (req, res) => {
  console.log(req.body);
  MongoClient.connect('mongodb://localhost:27017/test_server')
    .then( db => {
      db.collection('users')
        .findOne({login:req.body.login})
        .then( user => {
          if (user) {
            if (user.password === req.body.password) {
              let token = jwt.sign({ foo: 'bar' }, 'sosi');
              return res.json({success:true, token:token});
            }
          }
          return res.json({success:false, message:'Invalid Password/Login.'});
        });
    } )
    .catch( err => console.log(err) );
});

app.get('/api/user/protected', ejwt({secret: 'sosi'}), function(req, res) {
  console.log(req.user);
  res.json({message:"protected data"});
});

app.get('/api/user/protected1', ejwt({secret: 'sosi1'}), function(req, res) {
  console.log(req.user);
  res.json({message:"protected data"});
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.sendStatus(401).json({message:"no auth"});
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function() {
  console.log("Listening on %j", server.address());
});

