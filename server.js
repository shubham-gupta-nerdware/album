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

//app.all('/*',function(req,res,next){
//    var url = req.headers.host +req.url;
//    global.serverConfig={};
//    serverConfig.url=url;
//    serverConfig.domain=req.headers.host;
//    console.log(serverConfig);
//    next();
//});

var MongoClient = require('mongodb').MongoClient;

// Connect to the db
var url ="mongodb://localhost:27017/db_homehapp_mongo";


MongoClient.connect(url, { promiseLibrary: Promise }, (err, db) => {
  if (err) {
      console.log('error while conecction');
  //  logger.warn(`Failed to connect to the database. ${err.stack}`);
  }
  app.locals.db = db;
  console.log(db);
  // app.listen(config.port, () => {
  //   logger.info(`Node.js app is listening at http://localhost:${config.port}`);
  // });
});


app.get('/story/:sid', function (req, res) {
    res.sendFile(path.resolve('./public/views/index.html'));
});

app.get('/createStory/:sid', function (req, res) {
    res.sendFile(path.resolve('./public/views/createStory.html'));
});




app.use('/',require('./routes/index.js'));
// routes ==================================================
//require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port, which is ' + port); 
//exports = module.exports = app;
