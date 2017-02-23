const config = require('./config.js');
const flock = require('flockos');
const express = require('express');
const path = require('path');
var store = require('./store.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

flock.appId =config.appId;
flock.appSecret = config.appSecret;


var restaurant = require('./routes/restaurant');
var app = express();
app.listen(8082,function(){
  console.log("listening at port 8082");
});
app.use(flock.events.tokenVerifier);

flock.events.on('app.install',function(event, callback){
  console.log(event.userId+" -- - "+event.token);
      callback();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.post('/events',flock.events.listener);

app.use('/restaurant',restaurant);

flock.events.on('client.slashCommand',function(event,callback){

  callback(null, { text : 'Launch Zomato '});

});


module.exports = app;
