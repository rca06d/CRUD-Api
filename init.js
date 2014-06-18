var express = require("express");
var mongoose = require("mongoose");

var routes = require("./routes/api.js");

// Connection to local database
mongoose.connect("mongodb://localhost/audioDB");

var app = express();

app.get("/create", routes.createClip);

app.get("/moar", routes.getMoarStuff);

var server = app.listen(3000, function() { 
	console.log("Here's my number: %d, call me maybe?", server.address().port);
});