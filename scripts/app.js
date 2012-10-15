var express = require('express'),
	sqlite3 = require('sqlite3').verbose();

var app = express();
var db = new sqlite3.Database('./db/census.db');

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
		  res.send(rows[0]);
	  });
	});
});

// get a single states counties
app.get('/api/state/:state/:type', function(req, res) {
	db.serialize(function() {

	  var code = req.params.state;
	  var type = req.params.type;

	  var query;
	  switch(type) {
		case "cities":
			query = "SELECT name, code, county_code AS countyCode, state_code AS stateCode FROM city WHERE state_code = ?";
			break;
		case "counties":
			query = "SELECT name, code FROM county WHERE state_code = ?";
			break;
		case "censuses":
			query = "SELECT c.* FROM census c JOIN state s ON s.id = c.unit_id WHERE c.type = 'state' AND s.code = ?";
			break;
		default:
			console.log("unknown list type");
			break;
	  }

	  var stmt = db.prepare(query);
	  stmt.all([code], function(err, rows) {
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
		  res.send(rows[0]);
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

var root = __dirname + '/../app';
console.log('static file directory: ' + root);
app.use('/', express.static(root));

var port = 3000;
app.listen(port);
console.log('Listening on port ' + port);
