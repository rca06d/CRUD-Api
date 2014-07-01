var express = require("express");
var mongoose = require("mongoose");
var busboy = require("connect-busboy"); // request comes in a big, ugly stream in node. Busboy formats the stream
var methodOverride = require("method-override");

var https = require("https");
var fs = require("fs");

// Connection to local database
mongoose.connect("mongodb://localhost/audioDB");

// Configuration
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://localhost:3000');
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
require("./routes")(app);

var options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

var server = https.createServer(options, app).listen(3001, function() { 
    console.log("Here's my number: %d, call me maybe?", server.address().port);
});