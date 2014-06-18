var express = require("express");
var mongoose = require("mongoose");

var routes = require("./routes/api.js");

// Connection to local database
mongoose.connect("mongodb://localhost/audioDB");

var app = express();

// Routes
app.get("/createclip", routes.createClip);
app.get("/getclipbyid/:id", routes.getClipById);
app.get("/getclipbyname/:name", routes.getClipByName);
app.get("/getallclips", routes.getAllClips);

var server = app.listen(3000, function() { 
	console.log("Here's my number: %d, call me maybe?", server.address().port);
});