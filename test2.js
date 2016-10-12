//ALL MODULES REQUIRED CAN BE FOUND HERE

var express = require('express'),
app = express(),
http = require('http'),
socketIO = require('socket.io'),
server, io;
var bodyParser     =         require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.set('view engine', 'ejs');


var breakfast_array = [];
var box_lunch =[];
var box_supper =[];
var box_breakfast =[];
var lunch_array = [];
var supper_array = [];

app.get('/', function(req, res){

  var Datastore = require('nedb')
, db = new Datastore({ filename:  'data.db', autoload: true });
  db.find({ time: 'breakfast'}, function (err, docs) {
    for (var i = 0; i < docs.length; i++) {
      breakfast_array.push(docs[i].name);
box_breakfast.push(docs[i].box);
    }  });
  });
function brian(matindi,db){
  
}
