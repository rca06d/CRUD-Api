var models = require("../models/models.js");
var AudioClip = models.AudioClip;

exports.createClip = function (request, response) {

	//console.log(request);

	var newClip = new AudioClip({ 
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

exports.getClipById = function (request, response) {

	var id = request.params.id;

	AudioClip.find({_id: id}, function (err, clip) {
	  if (err) {
	  	response.writeHead(200);
		response.write("Something went wrong. Err: " + err);
	  } else {
	  	response.writeHead(200);
		response.write(JSON.stringify(clip));
	  }
	  response.end();
	})
};

exports.getClipByName = function (request, response) {

	var name = request.params.name;

	AudioClip.find({name: name}, function (err, clip) {
	  if (err) {
	  	response.writeHead(200);
		response.write("Something went wrong. Err: " + err);
	  } else {
	  	response.writeHead(200);
		response.write(JSON.stringify(clip));
	  }
	  response.end();
	})
};

exports.getAllClips = function (request, response) {
	AudioClip.find(function (err, clips) {
	  if (err) {
	  	response.writeHead(200);
		response.write("Something went wrong. Err: " + err);
	  } else {
	  	response.writeHead(200);
		response.write(JSON.stringify(clips));
	  }
	  response.end();
	})
};