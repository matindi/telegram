//ALL MODULES REQUIRED CAN BE FOUND HERE

var express = require('express'),
app = express(),
http = require('http'),
socketIO = require('socket.io'),
server, io;
var bodyParser     =         require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.set('view engine', 'ejs');


app.get('/', function(req, res){
  var breakfast_array = [];
  var breakfast_view_array = [];
  var lunch_view_array = [];
  var supper_view_array = [];
  var box_lunch =[];
  var box_supper =[];
  var box_breakfast =[];
  var lunch_array = [];
  var supper_array = [];
  var Datastore = require('nedb')
  , db = new Datastore({ filename:  'data.db', autoload: true });
  db.find({ time: 'breakfast'}, function (err, docs) {
    for (var i = 0; i < docs.length; i++) {
      breakfast_array.push(docs[i].name);
      box_breakfast.push(docs[i].box);
    }  });

    db.find({ time: 'lunch'}, function (err, docs) {
      for (var i = 0; i < docs.length; i++) {

        lunch_array.push(docs[i].name);
        box_lunch.push(docs[i].box);
        var resa = (docs[i].name).split("");
        resa.pop();

        var final_resa = resa.join("");

        lunch_view_array.push(final_resa);

      }   });
      db.find({ time: 'supper'}, function (err, docs) {
        for (var i = 0; i < docs.length; i++) {
          supper_array.push(docs[i].name);
          box_supper.push(docs[i].box);
          var resa = (docs[i].name).split("");
          resa.pop();
          resa.pop();

          var final_resa = resa.join("");

          supper_view_array.push(final_resa);


        }
        res.render('login',{breakfast: breakfast_array,
          supper: supper_array,
          supper_view: supper_view_array,
          lunch_view: lunch_view_array,
          breakfast_view: breakfast_view_array,
          lunch : lunch_array,
          box_lunch : box_lunch,
          box_breakfast : box_breakfast,
          box_supper : box_supper});
        });

      });

      app.get('/add', function(req, res){
        res.render('add',{});
      });


      app.get('/delete', function(req, res){
        var breakfast_array = [];
        var breakfast_view_array = [];
        var lunch_view_array = [];
        var supper_view_array = [];
        var box_lunch =[];
        var box_supper =[];
        var box_breakfast =[];
        var lunch_array = [];
        var supper_array = [];
        var Datastore = require('nedb')
        , db = new Datastore({ filename:  'data.db', autoload: true });
        db.find({ time: 'breakfast'}, function (err, docs) {
          for (var i = 0; i < docs.length; i++) {
            breakfast_array.push(docs[i].name);
            box_breakfast.push(docs[i].box);
          }  });

          db.find({ time: 'lunch'}, function (err, docs) {
            for (var i = 0; i < docs.length; i++) {

              lunch_array.push(docs[i].name);
              box_lunch.push(docs[i].box);
              var resa = (docs[i].name).split("");
              resa.pop();

              var final_resa = resa.join("");

              lunch_view_array.push(final_resa);

            }   });
            db.find({ time: 'supper'}, function (err, docs) {
              for (var i = 0; i < docs.length; i++) {
                supper_array.push(docs[i].name);
                box_supper.push(docs[i].box);
                var resa = (docs[i].name).split("");
                resa.pop();
                resa.pop();

                var final_resa = resa.join("");
                console.log(final_resa);
                supper_view_array.push(final_resa);
                console.log(supper_view_array);


              }
              res.render('delete',{breakfast: breakfast_array,
                supper: supper_array,
                supper_view: supper_view_array,
                lunch_view: lunch_view_array,
                breakfast_view: breakfast_view_array,
                lunch : lunch_array,
                box_lunch : box_lunch,
                box_breakfast : box_breakfast,
                box_supper : box_supper});
              });

            });




            app.post('/send',urlencodedParser, function (req, res) {
              io.on('connection', function (socket) {
                socket.on('greeting-from-client', function (message) {
                  console.log(message);
                });
              });
              var new_name;
              response = {
                item_name:req.body.item_name,
                item_price:req.body.item_price,
                item_time:req.body.food
              };
              var saving_name;
              if (response.item_time=="breakfast") {
                var saving_name= response.item_name;
              }else if (response.item_time=="lunch") {
                var new_saving_name = (response.item_name).split("");
                var final_saving_name =   new_saving_name.push("_");
                var saving_name= new_saving_name.join("");

              }else if (response.item_time=="supper") {
                var new_saving_name = (response.item_name).split("");
                var final_saving_name =   new_saving_name.push("__");
                var saving_name= new_saving_name.join("");
              }

              console.log(req.body.food);
              console.log(response);
              var Datastore = require('nedb')
              , db = new Datastore({ filename: 'data.db', autoload: true });
              var doc = { name:saving_name
                , price: response.item_price
                , box : "null"
                , state  :"false"
                , time : response.item_time
              };
              db.insert(doc, function (err, newDoc) {
                console.log(newDoc);

              })

            });



            app.post('/delete_items',urlencodedParser, function (req, res) {
              var new_name;
              var  item_value=req.body.delete_value;
              console.log(item_value);
              , db = new Datastore({ filename:  'data.db', autoload: true });
              var Datastore = require('nedb')
              for (var i = 0; i < item_value.length; i++) {
                db.remove({ name: item_value[i] }, {}, function (err, numRemoved) {
                  console.log(item_value.length);
                });
              }

            });

            //----------------------------------------------------------------------------------------------------------------------------------------------------------//
            //routers to all webpages and post and get requests can be found here




            app.use('/', express.static(__dirname + '/www')); // redirect root
            app.use('/databases', express.static(__dirname + '/databases')); // redirect root
            app.use('data.db', express.static(__dirname + 'data.db')); // redirect root
            app.use('/css', express.static(__dirname + '/css')); // redirect root
            app.use('/js', express.static(__dirname + '/js'));
            app.use('/bootstrap-3.3.7', express.static(__dirname + '/bootstrap-3.3.7')); // redirect root
            app.use('/bootstrap-switch-master', express.static(__dirname + '/bootstrap-switch-master'));



            server = http.Server(app);
            server.listen(5000);
            io = socketIO(server);
            io.on('connection', function (socket) {
              socket.emit('greeting-from-server', {
                greeting: ''
              });
              socket.on('greeting-from-client', function (message) {
                var Datastore = require('nedb')
                , db = new Datastore({ filename:  'data.db', autoload: true });
                db.find({}, function (err, docs) {
                  for (var i = 0; i < docs.length; i++) {
                    if ((message[0]==false) && message[1]==docs[i].name) {
                      console.log(message[1]);
                      console.log(docs[i].name);
                      db.update( { name: message[1]}, { $set: { state: "false" } }, {},function (err, numReplaced) {
                        console.log(numReplaced);
                        db.persistence.compactDatafile();
                      });
                      db.update( { name: message[1]}, { $set: { box: "null" } }, {},function (err, numReplaced) {
                        console.log(numReplaced);
                        db.persistence.compactDatafile();
                      });
                    }

                  }
                  for (var i = 0; i < docs.length; i++) {
                    if ((message[0]==true) && message[1]==docs[i].name) {
                      console.log(message[1]);
                      console.log(docs[i].name);
                      db.update( { name: message[1]}, { $set: { state: "true" } }, {},function (err, numReplaced) {
                        console.log(numReplaced);
                        db.persistence.compactDatafile();
                      });
                      db.update( { name: message[1]}, { $set: { box: "checked" } }, {},function (err, numReplaced) {
                        console.log(numReplaced);
                        db.persistence.compactDatafile();
                      });
                    }

                  }
                });
              });
            });
