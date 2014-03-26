
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var activityAPI = require('./routes/ActivityStreamAPI');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/api/activity', activityAPI.postActivity);
app.get('/api/activity', activityAPI.searchActivity);
app.post('/api/activity/update', activityAPI.updateActivity);

var server = http.createServer(app);
require('./library/clients').listen(server);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.info("Mongo connection open.")
});
mongoose.connect('mongodb://192.168.7.50/activity?ConnectionLifetime=300000;Pooled=true');
