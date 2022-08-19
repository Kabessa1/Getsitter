const initDB = require('./DB/init-DB');
var express = require('express');
const bodyParser = require("body-parser");
// var cors = require('cors');
var path = require('path');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// initDB.init().then(() => {
//     console.log('DB connected!');
// })
var distDir = __dirname + "/dist/";
app.use(express.static(__dirname + '/public'));
app.use(express.static(distDir));

app.use('/api', router);

app.get('/', function(req, res) {

res.send('Hello World!');

});

app.use('/api', require('./routes/system-users-routes'))
app.use('/api', require('./routes/users-routes'))

const users = require('./routes/system-users-routes');
const usersProfile = require('./routes/users-routes');

//=========================

app.listen(3000, function() {

console.log('My app is listening on port 3000!');

});

//======================================================////////////////

