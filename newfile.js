------WebKitFormBoundaryRF6kpeYZE7Z6cCcH
Content-Disposition: form-data; name="name"

server.js
------WebKitFormBoundaryRF6kpeYZE7Z6cCcH
Content-Disposition: form-data; name="uploaded_files"; filename="server.js"
Content-Type: application/javascript

// Set up
var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// Configuration
app.use(express.static(__dirname + '/public')); // It tells to ExpressJS that the public directory should act as your web root. Everything in it can be referenced via /, so if you also have a CSS folder in there, you might use /css/styles.css
app.use(morgan('dev')); // Log every request to the console
app.use(bodyParser()); // Pull information from html in POST
app.use(methodOverride()); // Simulate DELETE and PUT

// Routes
router.use(function(req, res, next) {
    next();
});

router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});

router.get('/', function(req, res) {
    res.sendfile('./public/views/index.html'); // The dot is your web root
});

router.get('/hello', function(req, res) {
    res.send('Hello World!');
});

router.get('/users/new', function(req, res) {
    res.sendfile('./public/views/users/new.html');
});

router.get('/users/:id', function(req, res) {
    //     res.id = req.params.id;
    //     console.log('por fin el id ' + req.params.id);
    res.sendfile('./public/views/users/show.html');
});

router.get('/users/:id/edit', function(req, res) {
    res.sendfile('./public/views/users/edit.html');
});

router.get('/users', function(req, res) {
    res.sendfile('./public/views/users/index.html');
});

app.use('/', router);

// Listening port
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
------WebKitFormBoundaryRF6kpeYZE7Z6cCcH--
