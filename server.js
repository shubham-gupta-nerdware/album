const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const path           = require('path');


var MongoClient = require('mongodb').MongoClient;
var port = process.env.PORT || 8000; // set our port
var url ="mongodb://localhost:27017/db_homehapp_mongo";

app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true })); 





app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

MongoClient.connect(url, { promiseLibrary: Promise }, (err, db) => {
    if(err) 
        console.log('error while conecction');

    app.locals.db = db;
});


app.get('/story/:sid', function (req, res) {
    res.sendFile(path.resolve('./public/views/index.html'));
});

app.get('/createStory/:sid', function (req, res) {
    res.sendFile(path.resolve('./public/views/createStory.html'));
});

app.use('/',require('./routes/index.js'));
app.listen(port);
console.log('Magic happens on port, which is ' + port); 
