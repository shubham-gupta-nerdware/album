/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var MongoClient = require('mongodb').MongoClient;

// Connect to the db
var url ="mongodb://localhost:27017/db_homehapp_mongo";




//MongoClient.connect("mongodb://localhost:27017/admin", function(err, db) {
//
//});
/*
 * db.collection.update(
   {username:"Bob"},
   {$set:{'longitude': '58.3', 'latitude': '0.3'}},
   { upsert: true}
)
 */
/*
 * db.collection.ensureIndex( { "username": 1 }, { unique: true } )
 * 
 */
module.exports= {MongoClient: MongoClient,
                url:url};
   