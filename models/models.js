var mongoose = require("mongoose");

var audioClip = mongoose.Schema({
    name: String, // display name for clip
    dateCreated: { type: Date, default: Date.now }, 
    transcript: String, // transcript of the video
    serverPath: String, // path on server
    clientPath: String, // path for use in browser
    length: Number // length in seconds
});

exports.AudioClip = mongoose.model("audioClip", audioClip);