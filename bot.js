

var TelegramBot = require('node-telegram-bot-api-latest');
var emoji = require('node-emoji');
var token = '282332784:AAGLsD4StY3j21Yf7KhLYCcyZ5925ctEr3Q';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});
var breakfast = {
  drinks : {
    tea : "ksh 5",
    cofee : "ksh 10"
  }
}

var options = {
        reply_markup: {
          keyboard : [
  ['meals']
]
        }
    };

    var meals = {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Breakfast', callback_data: '1'}], // Clicking will send "1"
                    [{text: 'Lunch', callback_data: '2'}], // Clicking will send "2"
                    [{text: 'Supper', callback_data: '3'}]  // Clicking will send "3"
                ]
            }
        };





    bot.onText(/\menu$/, function(msg, match) {
     var fromId = msg.from.id;
     bot.sendMessage(fromId, 'Hello ' + msg.from.first_name + '.your menu is coming right up' + emoji.get('smiley_cat'));
     var Datastore = require('nedb')
     , db = new Datastore({ filename: 'data.db', autoload: true });
     db.find({}, function (err, docs) {
     console.log(docs);
     str = JSON.stringify(docs);
     console.log(str);
     for (var i = 0; i < docs.length; i++) {
    bot.sendMessage(fromId,docs[i].name + "  at ksh" + docs[i].price );


     }
     });
    });

      bot.onText(/\meals$/, function(msg, match) {
         bot.sendMessage(msg.from.id, 'Hello ' + msg.from.first_name + '. What meal would you like to check on?', meals);
      });

bot.onText(/\/start$/, function(msg, match) {
 var fromId = msg.from.id;
 bot.sendMessage(fromId, 'Hello ' + msg.from.first_name + '. What meal would you like to check on?', options);
});

bot.on('callback_query', function(msg) {
    var user = msg.from.id;
    var data = msg.data;
    //bot.sendMessage(msg.from.id, "You clicked button with data '"+ data +"'");
if (msg.data==1) {
  var chatId = msg.from.id;



var Datastore = require('nedb')
, db = new Datastore({ filename: 'data.db', autoload: true });
db.find({}, function (err, docs) {
console.log(docs);
str = JSON.stringify(docs);
console.log(str);
for (var i = 0; i < docs.length; i++) {

    if (docs[i].time == "breakfast" && docs[i].state == "true" ) {
      var item = docs[i].name;
      console.log(item);
        var name = docs[i].name+'.jpg';
        bot.sendMessage(chatId, "Breakfast: " + item + " @ ksh " + docs[i].price   );

}
}
});

}
else if (msg.data==2) {
  var chatId = msg.from.id;
var ugali = 'ugali.jpg';
var pilau = 'pilau.jpg';
var mukimo = 'mukimo.jpg';
var beans_stew = 'beans_stew.jpg';
var sukumawiki = 'sukumawiki.jpg';
var cabbage = 'cabbage.jpg';

var Datastore = require('nedb')
, db = new Datastore({ filename: 'data.db', autoload: true });
db.find({}, function (err, docs) {
console.log(docs);
str = JSON.stringify(docs);
console.log(str);
for (var i = 0; i < docs.length; i++) {

    if (docs[i].time == "lunch" && docs[i].state == "true" ) {
      var item = docs[i].name;
      console.log(item);
      var resa = (item).split("");
      resa.pop();
      var final_resa = resa.join("");
        var name = docs[i].name+'.jpg';
        bot.sendMessage(chatId,"Lunch: " +  final_resa +" @ ksh " + docs[i].price  );

}
}
});
}
else if (msg.data==3) {
  var Datastore = require('nedb')
  , db = new Datastore({ filename: 'data.db', autoload: true });
  db.find({}, function (err, docs) {
  console.log(docs);
  str = JSON.stringify(docs);
  console.log(str);
    var chatId = msg.from.id;
  for (var i = 0; i < docs.length; i++) {

      if (docs[i].time == "supper" && docs[i].state == "true" ) {
        var item = docs[i].name;
        console.log(item);
        var resa = (item).split("");
        resa.pop();
        resa.pop();
        var final_resa = resa.join("");
          var name = docs[i].name+'.jpg';
          bot.sendMessage(chatId,"Supper: " +  final_resa  +" @ ksh "  +docs[i].price  );

  }
  }
  });
}
});

bot.onText(/\/echo (.+)/, function (msg, match) {
  var chatId = msg.chat.id;
  var resp = match[1];
  bot.sendMessage(chatId, resp);
});
