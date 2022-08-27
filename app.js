const initDB = require('./server/DB/init-DB');
var express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
var path = require('path');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// initDB.init().then(() => {
//     console.log('DB connected!');
// })
app.use('/api', require('./server/routes/system-users-routes'));
app.use('/api', require('./server/routes/users-routes'));

app.use(express.static(__dirname + '/dist/public'));
app.get('/*', function(req,res) {res.sendFile(path.join(__dirname+'/dist/public/index.html'));
});

// app.use('/api', router);

// app.get('/', function(req, res) {

// res.send('Hello World!');

// });

const port = process.env.PORT || 3000;




// const users = require('./server/routes/system-users-routes');
// const usersProfile = require('./server/routes/users-routes');

//=========================

app.listen(port, function() {

console.log(`My app is listening on port ${port}!`);

});

//======================================================////////////////

