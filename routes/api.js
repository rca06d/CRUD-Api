var models = require("../models/models.js");

exports.createClip = function (request, response) {

	console.log(request);

	var newClip = new models.AudioClip({ 
		name: "New Clip",
	    path: "/some/path/to/newclip.wav",
	    length: 10.5,
	    sampleRate: 44100,
	    bitDepth: 16,
	    position: 21.2
	});

	newClip.save(function (err, newClip) {
	  if (err) {
	  	response.writeHead(200);
		response.write("Something went wrong. Err: " + err);
	  } else {
	  	response.writeHead(200);
		response.write("Clip created: \"" + newClip.name + "\"");
	  }
	  response.end();
	});

};

exports.getMoarStuff = function (request, response) {
	response.writeHead(200);
	response.write("Moaarrrrrrrrrrr");
	response.end();
};

exports.postStuff = function (request, response) {
	response.writeHead(200);
	response.pipe(request);
};