var express = require('express'),
    knex = require('knex'),
    bookshelf = require('bookshelf'),
    app = express();

//db setup
var db_config = knex(require('./knexfile').development);
var bookshelf = bookshelf(db_config);
app.set('bookshelf', bookshelf);

//user model setup
var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at']

});

// routes

app.get('/', function(req, res){
  User.fetchAll().then(function(all){res.send(all); });
});

app.get('/new', function(req, res){
  var user = new User({ email: 'foo@bar.com' });
  user.save().then(function(){res.send(user);});
});

var server = app.listen(3000, function(){
  console.log("listening on port %d", server.address().port);
});
