var express = require('express'),
	sqlite3 = require('sqlite3').verbose();

var app = express();
var db = new sqlite3.Database('census.db');

// get all states
app.get('/api/states', function(req, res) {
	db.serialize(function() {
	  db.all("SELECT area, code, name, abbreviation FROM state", function(err, rows) {
		  res.send(rows);
	  });
	});
});

// get single state (by code)
app.get('/api/state/:state', function(req, res) {
	db.serialize(function() {
	  var code = req.params.state;
	  var stmt = db.prepare("SELECT area, code, name, abbreviation, (SELECT COUNT(*) FROM city WHERE state_code = ?) AS CITIES, (SELECT COUNT(*) FROM county WHERE state_code = ?) AS COUNTIES FROM state WHERE code = ?");
	  stmt.all([code, code, code], function(err, rows) {
		  res.send(rows);
	  });
	});
});

// get single county (by code)
app.get('/api/state/:state/county/:county', function(req, res) {
	db.serialize(function() {
	  var state = req.params.state;
	  var county = req.params.county;
	  var stmt = db.prepare("SELECT area, code, name, state_code, state_name, (SELECT COUNT(*) FROM city WHERE state_code = ?) AS CITIES FROM county WHERE state_code = ? AND code = ?");
	  stmt.all([state, state, county], function(err, rows) {
		  res.send(rows);
	  });
	});
});

// get single city (by code)
app.get('/api/state/:state/county/:county/city/:city', function(req, res) {
	db.serialize(function() {
	  var state = req.params.state;
	  var county = req.params.county;
	  var city = req.params.city;
	  var stmt = db.prepare("SELECT area, code, name, county_code, county_name, state_code, state_name, state_abbreviation FROM city WHERE state_code = ? AND county_code = ? AND code = ?");
	  stmt.all([state, county, city], function(err, rows) {
		  res.send(rows);
	  });
	});
});

// get the census (by code)
app.get('/api/state/:state/county/:county/city/:city', function(req, res) {
	db.serialize(function() {
	  var state = req.params.state;
	  var county = req.params.county;
	  var city = req.params.city;
	  var stmt = db.prepare("SELECT area, code, name, county_code, county_name, state_code, state_name, state_abbreviation FROM city WHERE state_code = ? AND county_code = ? AND code = ?");
	  stmt.all([state, county, city], function(err, rows) {
		  res.send(rows);
	  });
	});
});

app.use('/', express.static(__dirname + '/app'));

var port = 3000;
app.listen(port);
console.log('Listening on port ' + port);
