var express = require("express");
var mongoose = require("mongoose");
var busboy = require("connect-busboy"); // request comes in a big, ugly stream in node. Busboy formats the stream
var methodOverride = require("method-override");

var api = require("./services/api.js");

// Connection to local database
mongoose.connect("mongodb://localhost/audioDB");

// Configuration
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
};

var app = express();

app.use(express.static('./public')); // serve static files from here
app.use(allowCrossDomain);
app.use(busboy());
app.use(methodOverride()); // Simulate DELETE and PUT

// Routes
app.get("/api/getclipbyid/:id", api.getClipById);
app.get("/api/getclipbyname/:name", api.getClipByName);
app.get("/api/getallclips", api.getAllClips);
app.post("/api/uploadclip", api.uploadClip);
app.put("/api/updateclip/:id", api.updateClip);
app.delete("/api/deleteclip/:id", api.deleteClip);

var server = app.listen(3001, function() { 
	console.log("Here's my number: %d, call me maybe?", server.address().port);
});