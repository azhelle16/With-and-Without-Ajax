var express = require("express");
var mysql = require("mysql");
var path = require("path");
var app = express();
var bodyParser = require('body-parser')
var met = require("method-override")

app.use(met('_method'))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "animals_db"
});
 
con.connect();
 
app.get('/animals', function(req, res){
	con.query('SELECT * FROM animals', function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json(results);
	});
});

app.get('/animals-insert', function(req, res){
	con.query('INSERT INTO animals (animal_name) VALUES (?)', req.query.animal_name, function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json({
	  	message: 'success'
	  });	
	});
});

app.post('/animal-insert-post', function(req, res){
	con.query('INSERT INTO animals (animal_name) VALUES (?)', [req.body.animal],function (error, results, fields) {
	  if (error) res.send(error)
	  else res.redirect('/')
	});
});

app.get('*', function(req, res){
	res.redirect('/')
});

app.listen(3000, function(){
	console.log('listening on 3000');
});