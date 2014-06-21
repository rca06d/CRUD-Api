var fs = require("fs");
var models = require("../models/models.js");
var AudioClip = models.AudioClip;

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

exports.uploadClip = function (request, response) {

	if (request.method === "POST" && request.url === "/api/uploadclip") {

        request.busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
            console.log("File received: " + filename + ", Encoding: " + encoding);

            var serverPath = "./public/uploads/" + filename;
            var clientPath = "http://localhost:3001/uploads/" + filename;
            // TODO: perhaps rename file before writing directly to disk

            // see if the clip is in mongo already
            AudioClip.findOne({path: serverPath}, function (err, clip) {
			  	if (clip) {
			  		console.log("found");
			  		// for now, even if we do find the clip we're going to overwrite
			  		// I'll figure out how to ask the user about it later
			  		var newFile = fs.createWriteStream(serverPath);
		            file.pipe(newFile);  		       
			  	} else {
			  		console.log("not found");
			  		// clip not found, so go ahead and make it
			  		var newFile = fs.createWriteStream(serverPath);

		            // pipe file read stream into disk write stream
		            file.pipe(newFile);

		            // create new cooresponding mongoose object
		            clip = new AudioClip({ 
						name: filename,
					    serverPath: serverPath,
					    clientPath: clientPath,
					    length: 10.5,
					}); 
			  	} // end if

			  	// save it
	            clip.save(function (err, clip) {
					if (err) {
						response.writeHead(200);
						response.write("Something went wrong saving file: " + filename + ". Err: " + err);
						response.end();
					} else {  	
						response.writeHead(200);
						response.write("File saved: \"" + serverPath + "\"");
						response.end();
					}
				}); // end save

			}); // end findOne

        }); // end busboy.on("file")

        request.busboy.on("finish", function() {
            console.log("done");  
        }); // end busboy.on("finish")

        request.pipe(request.busboy);

    }

};

exports.updateClip = function (request, response) {

	var body = "";
    // we want to get the data as utf8 strings
    // If you don't set an encoding, then you'll get Buffer objects
    request.setEncoding('utf8');

    // Readable streams emit 'data' events once a listener is added
    request.on('data', function (chunk) {
        body += chunk;
    });

    // the end event tells you that you have entire body
    request.on('end', function () {

        try {

        	var id = request.params.id;

            body = JSON.parse(body);

            AudioClip.update({_id: id}, { $set: body }, function (err, clip) {

				if (err) {
					response.writeHead(200);
					response.write("Something went wrong. Err: " + err);
				} else {
					response.writeHead(200);
					response.write(JSON.stringify(clip));
				} // end if

				response.end();
			}); // end update

        } catch (er) {

            // uh oh!  bad json!
            response.statusCode = 400;
            return response.end('error: ' + er.message);

        } // end try catch

    }); // end request end

};

exports.deleteClip = function (request, response) {

	var id = request.params.id;

	AudioClip.findOne({_id: id}, function (err, clip) {

		if (err) {

			response.writeHead(200);
			response.write("Something went wrong. Err: " + err);
			response.end();

		} else {

			fs.unlink(clip.serverPath, function() {

				AudioClip.remove({_id: id}, function (err, result) {

					if (err) {

						response.writeHead(200);
						response.write("Something went wrong. Err: " + err);

					} else {

						response.writeHead(200);
						response.write(JSON.stringify(result));

					} // end remove if

					response.end();

				}); // end mongoose remove

			}); // end unlink

		} // end find if
		
	}); // end mongoose find
	
}; // end deleteClip