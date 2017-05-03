const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const path = require('path');


// config files
//here i changed ok

var port = process.env.PORT || 8000; // set our port

// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (db) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users


app.get('/', function (req, res) {
  res.sendFile(path.resolve('./public/views/index.html'));
});




app.use('/',require('./routes/index.js'));
// routes ==================================================
//require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port, which is ' + port); 
exports = module.exports = app;
